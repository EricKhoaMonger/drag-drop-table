import React, {
  KeyboardEventHandler,
  ReactText,
  useRef,
  useState
} from 'react';
import ReactDOM = require('react-dom');
import { CellItem } from './cell.types';
import Table from './table';
import VirtualizedTable from './virtualized-table';
import { makeTableProps } from './make-table';
import { makeTablePropsWithWorker } from './worker';

const MAGIC_NUMBER = 100;

function MakeTableControls() {
  const nRef = useRef<HTMLInputElement>(null);
  const [n, setN] = useState<ReactText>(200);

  const makeTable = async () => {
    if (!Number(n)) {
      return;
    }

    setN(String(n));

    ReactDOM.render(
      <div>rendering...</div>,
      document.getElementById('table-root')
    );

    if (Number(n) >= MAGIC_NUMBER) {
      makeTablePropsWithWorker(Number(n), table => {
        ReactDOM.render(
          <VirtualizedTable table={table} />,
          document.getElementById('table-root')
        );
      });
      return;
    }
    const table = makeTableProps(Number(n));
    ReactDOM.render(
      <Table table={table} />,
      document.getElementById('table-root')
    );
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
