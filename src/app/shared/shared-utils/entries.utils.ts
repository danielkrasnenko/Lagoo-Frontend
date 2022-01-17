// A type for key/value tuples of any object
export type Entries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

// Generates an array of object key/value tuples
export const extractEntries = <T extends object>(object: T) => Object.entries(object) as Entries<T>;

// Generates an array of object keys
export const extractKeys = <T extends object, K extends keyof T>(object: T): K[] => Object.keys(object) as K[];

// Generates an array of object values
export const extractValues = <T extends object, K extends keyof T>(object: T): T[K][] => Object.values(object);
