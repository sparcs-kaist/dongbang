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
type BaseIO<T> = OmitMatch<T, LinkField> & LinkKeys<T>
export type Mutation<T> = BaseIO<T> & { _id?: string };
export type Query<T> = BaseIO<T> & LinkedData<T>;

// Link types
type BaseLink<TSchema, Vtype extends "one" | "many" | "inverse"> = {
    schema: TSchema,
    type: Vtype,
}

// export type One<T> = BaseLink<T, "one">;
export class One<T> implements BaseLink<T, "one"> {
    schema: T;
    type: "one";
}

// export type Many<T> = BaseLink<T, "many">;
export class Many<T> implements BaseLink<T, "many"> {
    schema: T;
    type: "many";
}

// export type Inverse<T> = BaseLink<T, "inverse">;
export class Inverse<T> implements BaseLink<T, "inverse"> {
    schema: T;
    type: "inverse";
}

type LinkWithId = One<any> | Many<any>;
export type LinkField = One<any> | Many<any> | Inverse<any>;

// Helpers
type Id<T extends object> = `${keyof T extends string ? keyof T : never}Id`;
type LinkKeys<T> = {
    [P in Id<PickMatch<T, LinkWithId>>]?: string;
};

type LinkedData<T> = {
    [P in keyof PickMatch<T, LinkField>]: T[P] extends LinkField
        ? T[P] extends One<any>
            ? Query<T[P]["schema"]> | undefined
            : Query<T[P]["schema"]>[]
        : never
} & { _id: string };

// Collections
export type RelatedQuery<T, V extends keyof Query<T>> = V extends keyof T
    ? T[V] extends BaseLink<any, any>
        ? Query<T[V]["schema"]> : never
    : never;
