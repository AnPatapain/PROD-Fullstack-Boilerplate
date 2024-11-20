import {Column} from "@app/shared-models/src/Column";

////////////////////
// API request type
export type ColumnCreationRequest = Omit<Column, 'id' | 'cards'>;