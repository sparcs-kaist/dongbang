import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {Outlet} from "react-router-dom";

import {Text} from "/imports/ui/components/Text";
import {MemberItem, MemberContainer, RequireLogin} from "./components";

import {AnimatePresence, LayoutGroup} from "framer-motion";

interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const Members: React.FC<MembersProps> = ({user, members}) => {
    const otherMembers = members?.filter(member => member._id !== user?._id);
    return (
        <div className={styles.root}>
            <Text.main>멤버</Text.main>
            <MemberContainer title={"내 프로필"}>
                {user
                    ? <MemberItem member={user}/>
                    : <RequireLogin/>}
            </MemberContainer>
            <LayoutGroup>
                <MemberContainer title={`동방 ${members?.length}`}>
                    <AnimatePresence initial={false}>
                        {otherMembers?.map(member =>
                            <MemberItem
                                key={member._id}
                                member={member}
                            />
                        )}
                    </AnimatePresence>
                </MemberContainer>
            </LayoutGroup>
            <Outlet/>
        </div>
    )
}

export default Members;
