import {Iter} from "./iter.ts";

export function Some<T>(value: T): Optional<T> {
    return new Optional(value);
}

export function None<T>(): Optional<T> {
    return new Optional<T>(null);
}

export class Optional<T> {
    value: T | null;

    constructor(value: T | null) {
        this.value = value;
    }

    isNone(): boolean {
        return this.value === null;
    }

    isSome(): boolean {
        return !this.isNone();
    }

    map<R>(f: {(i: T): R}): Optional<R> {
        if (this.value) {
            return Some(f(this.value));
        } else {
            return None();
        }
    }

    flatMap<R>(f: {(i: T): Optional<R>}): Optional<R> {
        if (this.value) {
            return f(this.value);
        } else {
            return None();
        }
    }

    orElse(f: { (): T }): T {
        if (this.value) {
            return this.value;
        } else {
            return f();
        }
    }

    or(other: T): T {
        return this.orElse(() => other)
    }

    /**
     * Throws error if value is None
     */
    unwrap(): T {
        if (this.value) {
            return this.value;
        } else {
            throw Error("unwrapped None value");
        }
    }
}
