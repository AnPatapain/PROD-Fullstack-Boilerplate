export function getToDayISOString() {
    const today: Date = new Date();
    return today.toISOString().split('T')[0];
}