import {Optional, Some, None} from "../mod.ts";

class User {
    constructor(public username: string, public email: Optional<string>) {

    }
}

const users = [
    new User("bob", Some("bob@slicedbread.com")),
    new User("Joe", Some("joe@gmail.com")),
    new User("Josh Box", None())
];

let emails = [...users].iter()
    .filter(i => i.email.isSome())
    .map(i => i.email.unwrap())
    .array();

console.log(users, emails);
