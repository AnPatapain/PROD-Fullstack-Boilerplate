import {Card} from "./Card";

export class Column {
    public readonly id: number;
    public columnName: string;
    public cards: Card[];

    constructor(id: number, columnName: string, cards: Card[]) {
        this.id = id;
        this.columnName = columnName;
        this.cards = [...cards];
    }
}