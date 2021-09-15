import { CellItem } from '../cell/cell.types';

export function makeTableProps(n: number): CellItem[][] {
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
