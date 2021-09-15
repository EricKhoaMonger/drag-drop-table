import produce from 'immer';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, CellMeasurerCache } from 'react-virtualized';
import Cell, { CellItem, OnCellChange } from '../cell';

import './table.css';
import { TableProps } from './table.types';

const cache = new CellMeasurerCache({
  defaultWidth: 50,
  minWidth: 50,
  fixedHeight: true
});

function VirtualizedTable({ table }: TableProps) {
  const [interalTable, setInternalTable] = useState<CellItem[][]>();
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

  const renderTable = () => {
    if (!interalTable) {
      return null;
    }
    const total = interalTable[0].length;
    return (
      <Grid
        cellRenderer={({ columnIndex, key, rowIndex, style }) => {
          const cell = interalTable[rowIndex][columnIndex];
          return (
            <div key={key} style={style}>
              <Cell key={key} {...cell} onCellChange={onCellChangeHandler} />
            </div>
          );
        }}
        rowCount={total}
        columnCount={total}
        rowHeight={50}
        columnWidth={50}
        width={window.innerWidth * 0.9}
        height={window.innerHeight * 0.7}
      />
    );
  };
  return (
    <Fragment>
      <div>rendered with react-virualized</div>
      <br />
      {renderTable()}
    </Fragment>
  );
}

export default VirtualizedTable;
