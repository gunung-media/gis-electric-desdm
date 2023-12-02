export function numberToLetter(number: number): string | null {
    if (Number.isInteger(number) && number >= 0) {
        return String.fromCharCode('A'.charCodeAt(0) + number);
    } else {
        return null;
    }
}
