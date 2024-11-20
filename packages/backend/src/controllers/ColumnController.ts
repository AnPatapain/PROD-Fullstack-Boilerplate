import {Body, Controller, Get, Path, Post, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {Column} from "@app/shared-models/src/Column";
import {ColumnRepo} from "../repositories/ColumnRepo";
import { type ColumnCreationRequest} from "@app/shared-utils/src/api-request-type";

@Route("/api/column")
export class ColumnController extends Controller {
    private columnRepo: IRepository<Column> = ColumnRepo.getInstance();

    /**
     * Retrieves a list of all users
     */
    @Get("")
    public async getColumns(): Promise<Column[]> {
        const columns: Column[] = await this.columnRepo.findAll();
        return columns;
    }

    /**
     * Create new column
     */
    @Post()
    public async createColumn(
        @Body() requestBody: ColumnCreationRequest,
    ) : Promise<Column> {
        const column = await this.columnRepo.createOne(requestBody);
        return column;
    }

    /**
     * Retrieves user by userId
     */
    @Get("{columnId}")
    public async getColumnById(
        @Path() columnId: number
    ): Promise<Column | null> {
        const column: Column | null = await this.columnRepo.findOneById(columnId);
        return column;
    }
}
