type ColumnDragItem = {
    index: number
    id: string
    text: string
    type: "COLUMN"
}
type CardDragItem = {
    index: number
    id: string
    text: string
    columnId: string
    type: "CARD"
}
export type DragItem = ColumnDragItem | CardDragItem