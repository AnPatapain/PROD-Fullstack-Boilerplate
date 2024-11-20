import {PRISMA_CLIENT} from "../../prisma";
import {IRepository} from "./IRepository";
import {User, UserCreation} from "@app/shared-models/src/User";

export class UserRepository implements IRepository<User>{
    private static instance: UserRepository | null = null;

    private constructor() {}

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    public async findAll() : Promise<Array<User>> {
        return PRISMA_CLIENT.user.findMany({
            include: {
                messages: true,
            },
        });
    }

    public async findOneById(id: number): Promise<User | null> {
        return PRISMA_CLIENT.user.findUnique({
            include: {
              messages: true,
            },
            where: {
                id: id
            }
        });
    }

    public async deleteMany() {
        return PRISMA_CLIENT.user.deleteMany({});
    }

    public async count(): Promise<number> {
        return PRISMA_CLIENT.user.count();
    }

    public async createOne(userWithoutId: UserCreation): Promise<User> {
        const createdUser = await PRISMA_CLIENT.user.create({
            data: {
                email: userWithoutId.email,
                name: userWithoutId.name,
            },
            include: {
                messages: true,
            }
        });
        return createdUser;
    }
}