import {Meteor} from "meteor/meteor";

import React from "react";


import {Text} from "/imports/ui/components/Text";
import {MemberItem, MemberContainer, RequireLogin} from "./components";

import {LayoutGroup} from "framer-motion";
import AnimatedOutlet from "/imports/ui/layouts/AnimatedOutlet";

interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const MembersPage: React.FC<MembersProps> = ({user, members}) => {
    const otherMembers = members?.filter(member => member._id !== user?._id);
    
    return (<>
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
        
        <AnimatedOutlet/>
    </>)
}

export default MembersPage;
