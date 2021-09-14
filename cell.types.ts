export type DraggedRow = number;
export type DroppedRow = number;
export type DraggedCol = number;
export type DroppedCol = number;
export type OnCellChange = (
  rows: [DraggedRow, DroppedRow],
  cols: [DraggedCol, DroppedCol]
) => void;

export interface CellItem {
  id: number;
  value: number;
  row: number;
  col: number;
}

export interface CellProps extends CellItem {
  onCellChange?: OnCellChange;
}
