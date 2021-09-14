import React, {
  KeyboardEventHandler,
  ReactText,
  useRef,
  useState
} from 'react';
import ReactDOM = require('react-dom');
import { CellItem } from './cell.types';
import Table from './table';

function makeTableProps(n: number): CellItem[][] {
  let currentRowIndex = 0;
  const table: CellItem[][] = [];
  while (currentRowIndex < n) {
    const row: CellItem[] = [];
    for (let i = 1; i <= n; i++) {
      const rowCell = i;
      if (rowCell === 1) {
        // first cell number
        const id = rowCell + currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      } else if (rowCell % 2 === 0) {
        // even cell number
        const id = n * rowCell - currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      } else {
        // odd cell number
        const id = n * (rowCell - 1) + 1 + currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      }
    }
    currentRowIndex += 1;
    table.push(row);
  }
  return table;
}

function MakeTableControls() {
  const nRef = useRef<HTMLInputElement>(null);
  const [n, setN] = useState<ReactText>(5);

  const makeTable = () => {
    if (!Number(n)) {
      return;
    }

    setN(String(n));

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
