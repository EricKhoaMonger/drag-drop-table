import React, {
  KeyboardEventHandler,
  ReactText,
  useRef,
  useState
} from 'react';
import ReactDOM = require('react-dom');
import Table from './table';
import VirtualizedTable from './virtualized-table';
import { makeTablePropsWithWorker } from './worker';

const MAGIC_NUMBER = 100;

function MakeTableControls() {
  const nRef = useRef<HTMLInputElement>(null);
  const [n, setN] = useState<ReactText>(500);

  const makeTable = async () => {
    if (!Number(n)) {
      return;
    }

    setN(String(n));

    // can also render something to block screen if user put a large n
    // so they can only update n after done rendering the table
    ReactDOM.render(
      <div>rendering...</div>,
      document.getElementById('table-root')
    );

    const t0 = performance.now();
    makeTablePropsWithWorker(Number(n), tableProps => {
      if (Number(n) >= MAGIC_NUMBER) {
        ReactDOM.render(
          <VirtualizedTable table={tableProps} />,
          document.getElementById('table-root'),
          () => {
            console.log(
              'done rendering with react-virtualized',
              performance.now() - t0
            );
          }
        );
        return;
      }

      ReactDOM.render(
        <Table table={tableProps} />,
        document.getElementById('table-root'),
        () => {
          console.log(
            'done rendering without react-virtualized',
            performance.now() - t0
          );
        }
      );
    });
  };

  const onNInputKeydownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      makeTable();
      nRef.current.blur();
      setN(String(n));
    }
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="n">n:</label>&nbsp;
          </td>
          <td>
            <input
              id="n"
              type="number"
              value={n}
              ref={nRef}
              onFocus={e => e.currentTarget.select()}
              onChange={e => {
                if (
                  typeof e.target.value === 'string' &&
                  e.target.value === ''
                ) {
                  setN('');
                  return;
                }
                setN(Math.abs(Number(e.target.value) || 0));
              }}
              onKeyDown={onNInputKeydownHandler}
            />
          </td>
        </tr>
        <tr>
          <td>Number of Rows:</td>
          <td>{n}</td>
        </tr>
        <tr>
          <td>Number of Columns:</td>
          <td>{n}</td>
        </tr>
        <tr>
          <td>Number of Cells:</td>
          <td>{Number(n) * Number(n)}</td>
        </tr>
        <tr />
        <tr>
          <td />
          <td style={{ textAlign: 'right' }}>
            <button disabled={typeof n !== 'number' || !n} onClick={makeTable}>
              make table
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MakeTableControls;
