import {Controller, Get, Path, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {UserRepository} from "../repositories/UserRepository";
import {User} from "@app/shared-models/src/User";

@Route("/api/users")
export class UserController extends Controller {
    private userRepository: IRepository<User> = UserRepository.getInstance();

    /**
     * Retrieves a list of all users
     */
    @Get("")
    public async getUsers(): Promise<User[]> {
        const users: User[] = await this.userRepository.findAll();
        return users;
    }

    /**
     * Retrieves user by userId
     */
    @Get("{userId}")
    public async getUsersById(
        @Path() userId: number
    ): Promise<User | null> {
        const user: User | null = await this.userRepository.findOneById(userId);
        return user;
    }
}
