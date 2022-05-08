import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {useTracker} from "meteor/react-meteor-data";
import {MemberCollection} from "/imports/db/members";

import {Link} from "react-router-dom";

const Members: React.FC = () => {
    const user = useTracker(() => Meteor.user());
    
    const members = useTracker(() =>
        MemberCollection.find({
            username: {$ne: user?.username}
        }).fetch()
    );
    
    // const setOnline
    
    
    return (
        <div className={styles.root}>
            <h1>멤버</h1>
            <h2>내 프로필</h2>
            <div>
                {user ? user._id : <Link to="login">로그인이 필요합니다</Link>}
            </div>
            
            
            <h2>동방</h2>
            <ul>
                {members.map(member =>
                    <li>{member.name}</li>
                )}
            </ul>
        </div>
    )
}

export default Members;
