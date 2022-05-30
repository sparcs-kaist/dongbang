import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {Outlet} from "react-router-dom";

import {Text} from "/imports/ui/components/Text";

import {MemberItem, MemberContainer, RequireLogin} from "./components";


interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const Members: React.FC<MembersProps> = ({user, members}) => {
    
    return (
        <div className={styles.root}>
            <Text.main>멤버</Text.main>
            <MemberContainer title={"내 프로필"}>
                {user
                    ? <MemberItem member={user}/>
                    : <RequireLogin/>}
            </MemberContainer>
            <MemberContainer title={`동방 ${members?.length}`}>
                {members?.map(member =>
                    <MemberItem
                        key={member._id}
                        member={member}
                    />
                )}
            </MemberContainer>
            <Outlet/>
        </div>
    )
}

export default Members;
