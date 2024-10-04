import { PrismaClient } from '@prisma/client'

const PRISMA_CLIENT = new PrismaClient();

const REPOS: Record<string, any> = {
    user: PRISMA_CLIENT.user,
}

export async function seed() {
    const oneOfReposIsEmpty = await checkOneOfReposIsEmpty();
    if (oneOfReposIsEmpty) {
        try {
            await clean();
            const user = await seedUser();
            console.log("user created::", user);
            const users = await PRISMA_CLIENT.user.findMany();
            console.log("users queried::", users);
            await PRISMA_CLIENT.$disconnect();
        } catch(error) {
            console.error(error);
            await PRISMA_CLIENT.$disconnect();
            process.exit(1);
        }
    }
}

export async function clean() {
    for(const repo in REPOS) {
        await REPOS[repo].deleteMany({});
    }
}

async function checkOneOfReposIsEmpty() {
    for (const repo in REPOS) {
        const numsRecord = await REPOS[repo].count();
        if (numsRecord === 0) return true;
    }
    return false;
}

async function seedUser() {
    const createdUser = await PRISMA_CLIENT.user.create({
        data: {
            email: "nkalk192002@gmail.com",
            name: "kean",
            messages: {
                create: [
                    {timeStamp: new Date(new Date().getDate() - 1), content: "kean.message.1"},
                    {timeStamp: new Date(), content: "kean.message.2"}
                ]
            }
        },
        include: {
            messages: true,
        }
    });
    return createdUser;
}