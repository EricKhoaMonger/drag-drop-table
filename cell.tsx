import React, { memo } from 'react';

import './cell.css';

function Cell({ id, value }: { id: number; value: number }) {
  return (
    <span
      className="cell"
      draggable
      id={`cell-${id}`}
      onDragStart={e => {
        e.currentTarget.classList.add('grabbing');
        e.dataTransfer.setData('dragged-cell-id', String(id));
        e.dataTransfer.setData(
          'dragged-cell-value',
          String(e.currentTarget.innerHTML)
        );
      }}
      onDragEnd={e => {
        e.currentTarget.classList.remove('grabbing');
      }}
      onDragOver={e => {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
      }}
      onDragLeave={e => {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
      }}
      onDrop={e => {
        e.preventDefault();
        const droppedCellValue = e.currentTarget.innerHTML;
        const draggedCellValue = e.dataTransfer.getData('dragged-cell-value');
        const draggedCell = document.getElementById(
          `cell-${e.dataTransfer.getData('dragged-cell-id')}`
        );

        e.currentTarget.classList.remove('dragover');
        e.currentTarget.innerHTML = draggedCellValue;
        draggedCell.innerHTML = droppedCellValue;
      }}
    >
      {value}
    </span>
  );
}

export default memo(Cell);
