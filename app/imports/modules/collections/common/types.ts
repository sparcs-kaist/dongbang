export type Resolver<T> = (value: T | PromiseLike<T>) => void;

export type Map<T> = { [key: string]: T };
