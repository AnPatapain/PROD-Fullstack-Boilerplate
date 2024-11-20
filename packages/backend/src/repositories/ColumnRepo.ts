import {IRepository} from "./IRepository";
import {Column} from "@app/shared-models/src/Column";
import {PRISMA_CLIENT, Prisma} from "../../prisma";
import {ColumnCreationRequest} from "@app/shared-utils/src/api-request-type";

export class ColumnRepo implements IRepository<Column> {
    private static instance: ColumnRepo | null = null;

    private constructor() {
    }

    public static getInstance() : ColumnRepo {
        if (!ColumnRepo.instance) {
            ColumnRepo.instance = new ColumnRepo();
        }
        return ColumnRepo.instance;
    }

    async count(): Promise<number> {
        return PRISMA_CLIENT.column.count();
    }

    async createOne(columnCreationRequest: ColumnCreationRequest): Promise<Column> {
        return PRISMA_CLIENT.column.create({
            data: columnCreationRequest,
            include: {
                cards: true,
            },
        });
    }

    deleteMany(): void {
        PRISMA_CLIENT.column.deleteMany({});
    }

    findAll(): Promise<Array<Column>> {
        return PRISMA_CLIENT.column.findMany({
            include: {
                cards: true,
            }
        });
    }

    findOneById(id: number): Promise<Column | null> {
        return PRISMA_CLIENT.column.findUnique({
            where: {
                id: id
            },
            include: {
                cards: true,
            }
        });
    }

}