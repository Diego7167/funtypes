import {Optional, Some, None} from "./optional.ts";

export interface IterItem<T> {
    value: T,
    next: IterItem<T> | null
}

export class Iter<T> {
    item: IterItem<T> | null;

    constructor(item?: IterItem<T> | T[]) {
        if (item instanceof Array) {
            let i = Iter.fromArray(item).item;
            this.item = i;
        } else {
            this.item = item ? item : null
        }
    }

    static fromArray<T>(array: T[]): Iter<T> {
        let iter: Iter<T> = new Iter();
        if (array.length === 0) return iter;
        iter.item = {value: array.splice(0, 1)[0], next: null};
        let cursor = iter.item;

        while (array.length > 0) {
            cursor.next = {value: array.splice(0, 1)[0], next: null};
            cursor = cursor.next;
        }

        return iter;
    }

    array(): T[] {
        let a: T[] = [];

        this.forEach(i => {
            a.push(i);
        })

        return a;
    }

    next(): Optional<T> {
        let item = this.item;
        if (!item) return None();

        this.item = item.next;
        return Some(item.value);
    }

    filter(f: {(i: T): boolean}): Iter<T> {
        let items: T[] = [];
        this.forEach(i => {
            if (f(i)) {
                items.push(i);
            }
        });
        return items.iter();
    }

    forEach(f: {(i: T): void}) {
        let cursor = this.item;

        while (cursor) {
            f(cursor.value);
            cursor = cursor.next;
        }
    }

    map<R>(f: {(i: T): R}): Iter<R> {
        return this.next().map(first => {
            let iter: Iter<R> = new Iter();
            iter.item = { value: f(first), next: null};
            let cursor = iter.item;

            this.forEach(i => {
                cursor.next = { value: f(i), next: null };
                cursor = cursor.next;
            });

            return iter;
        }).or(new Iter());
    }
}

declare global {
    interface Array<T> {
        iter(): Iter<T>
    }
}

if (!Array.prototype.iter) {
    Array.prototype.iter = function<T>(): Iter<T> {
        return new Iter(this);
    }
}
