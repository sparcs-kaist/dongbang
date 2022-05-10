export const Enum = (enumObj: Object) => (
    new RegExp(`^${
        Object
            .values(enumObj)
            .map(v => `(${v})`)
            .join("|")
    }$`)
);
