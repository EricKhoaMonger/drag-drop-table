import React, { DragEventHandler, memo } from 'react';

import './cell.css';

function Cell({ id, value }: { id: number; value: number }) {
  console.log(`cell-${id}`);
  const onDragStartHandler: DragEventHandler<HTMLSpanElement> = e => {
    e.currentTarget.classList.add('grabbing');
    e.dataTransfer.setData('dragged-cell-id', String(id));
    e.dataTransfer.setData(
      'dragged-cell-value',
      String(e.currentTarget.innerHTML)
    );
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
    const droppedCellValue = e.currentTarget.innerHTML;
    const draggedCellValue = e.dataTransfer.getData('dragged-cell-value');
    const draggedCell = document.getElementById(
      `cell-${e.dataTransfer.getData('dragged-cell-id')}`
    );

    e.currentTarget.classList.remove('dragover');
    e.currentTarget.innerHTML = draggedCellValue;
    draggedCell.innerHTML = droppedCellValue;
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

export default Cell;
