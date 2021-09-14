import React, { DragEventHandler, memo } from 'react';

import './cell.css';
import { CellItem } from './table';

type DraggedRow = number;
type DroppedRow = number;
type DraggedCol = number;
type DroppedCol = number;
export type OnCellChange = (
  rows: [DraggedRow, DroppedRow],
  cols: [DraggedCol, DroppedCol]
) => void;

interface CellProps extends CellItem {
  onCellChange?: OnCellChange;
}

function noop() {}

function Cell(props: CellProps) {
  const { id, value, row, col, onCellChange = noop } = props;

  const onDragStartHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.currentTarget.classList.add('grabbing');
    e.dataTransfer.setData('dragged-cell-row', String(row));
    e.dataTransfer.setData('dragged-cell-col', String(col));
  };
  const onDragEndHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.currentTarget.classList.remove('grabbing');
  };
  const onDragOverHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };
  const onDragLeaveHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };
  const onDropHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.preventDefault();
    const draggedCellRow = Number(e.dataTransfer.getData('dragged-cell-row'));
    const draggedCellCol = Number(e.dataTransfer.getData('dragged-cell-col'));

    e.currentTarget.classList.remove('dragover');

    onCellChange([draggedCellRow, row], [draggedCellCol, col]);
  };

  return (
    <span
      className="cell"
      draggable
      id={`cell-${id}`}
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      {value}
    </span>
  );
}

export default memo(Cell);
