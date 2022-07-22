export const Enum = (enumObj: Object) => (
    new RegExp(`^${
        Object
            .values(enumObj)
            .map(v => `(${v})`)
            .join("|")
    }$`)
);

type Field = BooleanConstructor
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | ArrayConstructor
    | "SimpleSchema.Integer"
    | RegExp
    | string

export const Optional = (field: Field) => (
    { type: field, optional: true }
);
