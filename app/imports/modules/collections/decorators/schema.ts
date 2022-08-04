import { metaStorage } from "../metaStorage";

export const Schema = (name: string): ClassDecorator => (target) => {
    metaStorage.schemas.set(target, name);
}
