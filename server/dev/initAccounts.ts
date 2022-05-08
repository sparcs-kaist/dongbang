import {Accounts} from "meteor/accounts-base";

const insertAccount = (index: number) => {
    if (!Accounts.findUserByUsername(`test${index}`)) {
        Accounts.createUser({
            username: `test${index}`,
            password: `password${index}`,
            profile: {
                name: `홍길동${index}`,
                nickname: `user${index}`
            }
        })
    }
}


export const initAccounts = (): void => {
    for (let i: number = 0; i < 10; i++) {
        insertAccount(i);
    }
}
