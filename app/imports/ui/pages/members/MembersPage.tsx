import {Meteor} from "meteor/meteor";

import React from "react";

import {Outlet} from "react-router-dom";

import {Text} from "/imports/ui/components/Text";
import {MemberItem, MemberContainer, RequireLogin} from "./components";

import {LayoutGroup} from "framer-motion";

interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const MembersPage: React.FC<MembersProps> = ({user, members}) => {
    const otherMembers = members?.filter(member => member._id !== user?._id);
    return (
        <div>
            <Text.main>멤버</Text.main>
            <LayoutGroup>
                <MemberContainer title={"내 프로필"}>
                    {user
                        ? <MemberItem member={user}/>
                        : <RequireLogin/>}
                </MemberContainer>
                <MemberContainer title={`동방 ${members?.length || 0}`}>
                    {otherMembers?.map(member =>
                        <MemberItem
                            key={member._id}
                            member={member}
                        />
                    )}
                </MemberContainer>
            </LayoutGroup>
            <Outlet/>
        </div>
    )
}

export default MembersPage;
