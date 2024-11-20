import {ColumnRepo} from "./repositories/ColumnRepo";


const columnRepo = ColumnRepo.getInstance();

const RepositoryToBeSeeded = [
    columnRepo,
]

export async function seed() {
    const oneOfReposIsEmpty = await checkOneOfReposIsEmpty();
    if (oneOfReposIsEmpty) {
        await clean();
        await seedColumn();
    }
}

export async function clean() {
    for(const repo of RepositoryToBeSeeded) {
        await repo.deleteMany();
    }
}

async function checkOneOfReposIsEmpty() {
    for (const repo in RepositoryToBeSeeded) {
        const numsRecord = await RepositoryToBeSeeded[repo].count();
        if (numsRecord === 0) return true;
    }
    return false;
}

async function seedColumn() {
    await columnRepo.createOne({
        columnName: "To Do"
    });
}