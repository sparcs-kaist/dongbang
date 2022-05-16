import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {Text} from "/imports/ui/components/Text";

import {MemberItem, MemberContainer} from "./components";

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
            <Text.main>멤버</Text.main>
            <Text.sub>내 프로필</Text.sub>
            <MemberContainer>
                {user
                    ? <MemberItem member={user}/>
                    : <Link to="login">로그인이 필요합니다</Link>}
            </MemberContainer>
            
            
            <Text.sub>동방 {members.length}</Text.sub>
            <MemberContainer>
                {members.map(member =>
                    <MemberItem
                        key={member._id}
                        member={member}
                    />
                )}
            </MemberContainer>
        </div>
    )
}

export default Members;
