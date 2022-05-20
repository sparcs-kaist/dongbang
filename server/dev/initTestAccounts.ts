import {Meteor} from "meteor/meteor";

const users: Mongo.OptionalId<Meteor.User>[] = [
    {
        name: "권순호",
        username: "snowsuno",
        isActive: false,
        // status: {
        //     type: UserStatus.OFFLINE,
        //     message: "",
        // }
    },
    {
        name: "홍길동",
        username: "gil",
        isActive: false
        // status: {
        //     type: UserStatus.OFFLINE,
        //     message: "",
        // }
    },
    {
        name: "가나다",
        username: "a",
        isActive: false
        // status: {
        //     type: UserStatus.OFFLINE,
        //     message: "",
        // }
    },
    // {
    //     name: "라마바",
    //     username: "b",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "사아자",
    //     username: "c",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "차카타",
    //     username: "d",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "파하가",
    //     username: "e",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "가나다",
    //     username: "f",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "가나다",
    //     username: "g",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "가나다",
    //     username: "h",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
    // {
    //     name: "가나다",
    //     username: "i",
    //     status: {
    //         type: UserStatus.OFFLINE,
    //         message: "",
    //     }
    // },
]

const createUser = (user: Mongo.OptionalId<Meteor.User>) => {
    if (!Meteor.users.findOne({username: user.username})) {
        Meteor.users.insert(user);
    }
}

Meteor.startup(() => {
    users.forEach(user => createUser(user));
});
