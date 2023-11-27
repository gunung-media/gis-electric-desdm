export function enumToStringArray(enumObject: any): string[] {
    return Object.keys(enumObject).map((key) => enumObject[key]);
}
