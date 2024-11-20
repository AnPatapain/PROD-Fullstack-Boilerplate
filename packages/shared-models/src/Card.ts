export class Card {
    public readonly id: number;
    public readonly columnId: number;

    public description: string;

    constructor(id: number, columnId: number, description: string) {
        this.id = id;
        this.columnId = columnId;
        this.description = description;
    }
}