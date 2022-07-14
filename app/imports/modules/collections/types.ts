// Essencial Generics
export type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T]

export type KeysUnmatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? never : K
}[keyof T];

type PickMatch<T, V> = Pick<T, KeysMatching<T, V>>;
type OmitMatch<T, V> = Pick<T, KeysUnmatching<T, V>>;


// IO types
type BaseIO<T> = OmitMatch<T, Link> & LinkKeys<T>
export type Mutation<T> = BaseIO<T> & { _id?: string };
export type Query<T> = BaseIO<T> & LinkedData<T>;


// Link types
type BaseLink<TSchema, Vtype extends "one" | "many" | "inverse"> = {
    schema: TSchema,
    type: Vtype,
}
export type One<T> = BaseLink<T, "one">;
export type Many<T> = BaseLink<T, "many">;
export type Inverse<T> = BaseLink<T, "inverse">;

type LinkWithId = One<any> | Many<any>;
export type Link = One<any> | Many<any> | Inverse<any>;


// Helpers
type Id<T extends object> = `${keyof T extends string ? keyof T : never}Id`;
type LinkKeys<T> = {
    [P in Id<PickMatch<T, LinkWithId>>]?: string;
};

type LinkedData<T> = {
    [P in keyof PickMatch<T, Link>]: T[P] extends Link
        ? T[P] extends One<any>
            ? LinkedData<T[P]["schema"]> | undefined
            : LinkedData<T[P]["schema"]>[]
        : never
} & { _id: string };

// Collections
export type RelatedQuery<T, V extends keyof Query<T>> = V extends keyof T
    ? T[V] extends BaseLink<any, any>
        ? Query<T[V]["schema"]> : never
    : never;
