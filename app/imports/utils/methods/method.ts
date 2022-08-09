import { Meteor } from "meteor/meteor";

import { validateSync } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidatedMethod } from "meteor/mdg:validated-method";

interface MethodOptions<T, U> {
    input: ClassConstructor<T>;
    resolve: (input: T, userId: string) => U;
}

interface Callable<T extends object, U> {
    (input: T): Promise<U>;
}

export const method = <T extends object, U>(
    name: string,
    options: MethodOptions<T, U>,
): Callable<T, U> => {
    const _validatedMethod = new ValidatedMethod<string, (input: T) => U>({
        name: name,
        validate: validator<T>(options.input),
        run(...args) {
            if (!this.userId) throw new Meteor.Error("Not authorized.");
            return options.resolve(...args, this.userId);
        },
    });

    return (input) =>
        new Promise<U>((resolve, reject) => {
            _validatedMethod.call(input, (error, result) => {
                error ? reject(error) : resolve(result);
            });
        });
};

const validator =
    <T extends object>(schema: ClassConstructor<T>) =>
    (object: unknown): void | never => {
        const instance = plainToClass(schema, object);

        const validationErrors = validateSync(instance);
        if (validationErrors.length > 0) {
            throw new Meteor.Error(
                "Validation Error",
                "Validation for method input failed",
                validationErrors.map((e) => e.toString()).join(", "),
            );
        }
    };
