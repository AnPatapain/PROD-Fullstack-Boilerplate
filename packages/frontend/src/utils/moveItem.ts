
export const moveItem = <T>(array: T[], from: number, to: number): T[] => {
    const newArray = [...array];
    const item = newArray.splice(from, 1)[0];
    //here splice returns an array of the removed items, so we need to access the first item in the array
    newArray.splice(to, 0, item);
    return newArray;
}

