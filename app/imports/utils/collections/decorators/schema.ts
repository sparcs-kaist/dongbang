import { metaStorage } from "../metaStorage";
import { BaseSchema } from "../types";

export const Schema =
    (name: string) =>
    (target: BaseSchema): void => {
        metaStorage.schemas.set(target, name);
    };
