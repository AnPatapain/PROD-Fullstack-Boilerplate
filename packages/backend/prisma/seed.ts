import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export async function seed(prisma: PrismaClient) {
    const createdUser = await prisma.user.create({
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

    const users = await prisma.user.findMany();
    console.log("users queried::", users);
}