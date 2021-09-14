import produce from 'immer';
import React, { useCallback, useEffect, useState } from 'react';
import Cell, { OnCellChange } from './cell';

import './table.css';

export interface CellItem {
  id: number;
  value: number;
  row: number;
  col: number;
}

function Table({ table }: { table: CellItem[][] }) {
  const [interalTable, setInternalTable] = useState<CellItem[][]>([]);
  useEffect(() => {
    setInternalTable(table);
  }, [table]);
  const onCellChangeHandler: OnCellChange = useCallback((rows, cols) => {
    setInternalTable(prev => {
      const updated = produce(prev, draft => {
        const [draggedRow, droppedRow] = rows;
        const [draggedCol, droppedCol] = cols;
        const dragged = draft[draggedRow][draggedCol - 1];
        const dropped = draft[droppedRow][droppedCol - 1];
        const draggedValue = dragged.value;
        const droppedValue = dropped.value;
        dragged.value = droppedValue;
        dropped.value = draggedValue;
      });
      return updated;
    });
  }, []);
  return (
    <div className="table">
      {interalTable.map(row => (
        <div key={row[1].id} className="row">
          {row.map(cell => (
            <Cell {...cell} key={cell.id} onCellChange={onCellChangeHandler} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
