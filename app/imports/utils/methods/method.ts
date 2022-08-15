import { Meteor } from "meteor/meteor";

import { validateSync } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidatedMethod } from "meteor/mdg:validated-method";

interface OptionsWithInput<I extends object, O> {
    input: ClassConstructor<I>;

    resolve(userId: string, input: I): O;
}

interface OptionsWithoutInput<O> {
    resolve(userId: string): O;
}

type Options<I extends object, O> =
    | OptionsWithInput<I, O>
    | OptionsWithoutInput<O>;

type CallableWithInput<I extends object, O> = (input: I) => Promise<O>;
type CallableWithoutInput<O> = () => Promise<O>;

type Callable<I extends object, O> =
    | CallableWithInput<I, O>
    | CallableWithoutInput<O>;

export function method<I extends object, O>(
    name: string,
    options: OptionsWithInput<I, O>,
): CallableWithInput<I, O>;
export function method<I extends object, O>(
    name: string,
    options: OptionsWithoutInput<O>,
): CallableWithoutInput<O>;

export function method<I extends object, O>(
    name: string,
    options: Options<I, O>,
): Callable<I, O> {
    if ("input" in options) {
        const _validatedMethod = new ValidatedMethod<string, (input: I) => O>({
            name: name,
            validate: validator(options.input),
            run(input) {
                if (!this.userId) throw new Meteor.Error("Not authorized.");
                return options.resolve(this.userId, input);
            },
        });

        return (input) =>
            new Promise<O>((resolve, reject) => {
                _validatedMethod.call(input, (error, result) => {
                    error ? reject(error) : resolve(result);
                });
            });
    } else {
        const _validatedMethod = new ValidatedMethod<string, () => O>({
            name: name,
            validate: null,
            run() {
                if (!this.userId) throw new Meteor.Error("Not authorized.");
                return options.resolve(this.userId);
            },
        });

        return () =>
            new Promise<O>((resolve, reject) => {
                _validatedMethod.call((error, result) => {
                    error ? reject(error) : resolve(result);
                });
            });
    }
}

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
