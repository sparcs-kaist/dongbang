import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {useTracker} from "meteor/react-meteor-data";

import {Link} from "react-router-dom";

import {updateStatus} from "/imports/api/methods/members";
import {UserStatus} from "/imports/db/users";

import {userQuery} from "/imports/api/query/members";

const Members: React.FC = () => {
    const user = useTracker(() => Meteor.user());
    
    // const members = useTracker(() =>
    //     MemberCollection.find({
    //         username: {$ne: user?.username}
    //     }).fetch()
    // );
    
    // const members = useTracker<Meteor.User[]>(() => {
    //     const handler = Meteor.subscribe("members");
    //
    //     if (!handler.ready()) {
    //         return [];
    //     }
    //
    //     return Meteor.users.find({}).fetch()
    // })
    const members = useTracker(() => {
        const query = userQuery.clone();
        const handler = query.subscribe();
        
        if (!handler.ready()) {
            return []
        }
        return query.fetch()
    });
    
    console.log(members[0])
    
    
    const changeStatus = () => {
        updateStatus.call(
            {
                type: user?.status.type === UserStatus.OFFLINE
                    ? UserStatus.PRESENT
                    : UserStatus.OFFLINE,
                message: "qwerqwer"
            },
            (err, res) => {
                if (err) alert(err)
                else {
                    console.log(res)
                }
            }
        )
    }
    
    
    return (
        <div className={styles.root}>
            <h1>멤버</h1>
            <h2>내 프로필</h2>
            <div>
                {user
                    ? <div>
                        <span>{user.name}</span>
                        <button onClick={changeStatus}>상태 변경</button>
                    </div>
                    : <Link to="login">로그인이 필요합니다</Link>}
            </div>
            
            
            <h2>동방</h2>
            <ul>
                {members.map(member =>
                    <li key={member._id}>
                        <div>
                            <span><h3>{member.name}</h3></span>
                            <span>{member.username}</span>
                            <div>{member.status.type}</div>
                            <div>{member.status.message}</div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Members;
