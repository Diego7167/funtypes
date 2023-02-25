# funtypes
Functional JavaScript types. Heavily inspired by wonderful languages like Rust and Scala.

## Types

### Optional

```ts
// Some(10)
let value = Some(10);

// Some(15)
let plusOne = value.map(i => i + 5);

// None
value = None();

// None
plusOne = value.map(i => i + 5);
```

### Iter

```ts
// Iter([1, 2, 3])
let iter = [1, 2, 3].iter();

// Iter([2, 4, 6])
let iter2 = iter.map(i => i * 2);
```
