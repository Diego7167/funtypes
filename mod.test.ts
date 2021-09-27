import {assertEquals} from "https://deno.land/std@0.108.0/testing/asserts.ts";

import {Optional, Some, None} from "./mod.ts";

Deno.test("iter", () => {
    // forEach
    let iter = [1, 2, 3].iter();
    let a: number[] = [];

    iter.forEach(i => a.push(i));
    assertEquals(a, [1, 2, 3]);

    // map
    iter = [1, 2, 3].iter();
    let i = iter.map(i => i * 2);
    assertEquals(i.array(), [2, 4, 6]);

    // filter
    iter = [1, 2, 3].iter();
    assertEquals(iter.filter(i => i % 2 !== 0).array(), [1, 3]);
});

Deno.test("optional", () => {
    // map
    let option = Some(10);
    let res: number = 5;
    option.map(i => res = i);
    assertEquals(res, 10);

    option = None<number>();
    res = 5;
    option.map(i => res = i);
    assertEquals(res, 5);

    // flatMap
    option = Some(10);
    let f = (i: number): Optional<string> => Some(`Number: ${i}`);
    let o1 = option.flatMap(f);
    assertEquals(Some("Number: 10"), o1);
});
