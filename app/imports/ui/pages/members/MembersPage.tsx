import {Meteor} from "meteor/meteor";

import React from "react";

import {Text} from "/imports/ui/components/Text";
import {MemberItem, MemberContainer, RequireLogin, DeviceRegister} from "./components";

import AnimatedOutlet from "/imports/ui/layouts/AnimatedOutlet";
import {LayoutGroup} from "framer-motion";

interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const MembersPage: React.FC<MembersProps> = ({user, members}) => {
    const otherMembers = members?.filter(member => member._id !== user?._id);
    
    return (<>
        <Text.main>멤버</Text.main>
        {!!user && <DeviceRegister/>}
        <MemberContainer title={"내 프로필"} key="me">
            {user
                ? <MemberItem member={user}/>
                : <RequireLogin/>}
        </MemberContainer>
        <LayoutGroup>
            <MemberContainer title={`동방 ${members?.length || 0}`} key="members">
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
