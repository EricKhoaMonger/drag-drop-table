import produce from 'immer';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Cell from './cell';
import { CellItem, OnCellChange } from './cell.types';

import './table.css';
import { TableProps } from './table.types';

function VirtualizedTable({ table }: TableProps) {
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
    <Fragment>
      <div>rendered with react-virualized</div>
      <br />
      <div className="table">
        {interalTable.map(row => (
          <div key={row[0].id} className="row">
            {row.map(cell => (
              <Cell
                {...cell}
                key={cell.id}
                onCellChange={onCellChangeHandler}
              />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default VirtualizedTable;
