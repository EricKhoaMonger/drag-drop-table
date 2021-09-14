import React from 'react';
import Cell from './cell';

import './table.css';

export interface Cell {
  id: number;
  value: number;
}

function Table({ table }: { table: Cell[][] }) {
  return (
    <div className="table">
      {table.map(row => (
        <div key={row[1].id} className="row">
          {row.map(cell => (
            <Cell {...cell} key={cell.id} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
