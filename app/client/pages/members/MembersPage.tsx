import React from "react";

import { Text } from "../../components";
import { MemberItem, MemberContainer, RequireLogin } from "./components";

import { Tracker } from "../../common/tracker/components";

import { AnimatedOutlet } from "../../layouts";
import { LayoutGroup } from "framer-motion";
import type { Query } from "/imports/utils/collections";
import type { User } from "/imports/collections/users";

interface MembersProps {
    user?: Query<User>;
    members?: Query<User>[];
}

const MembersPage: React.FC<MembersProps> = ({ user, members }) => {
    const otherMembers = members?.filter((member) => member._id !== user?._id);

    return (
        <>
            <Text.main>멤버</Text.main>
            <Tracker user={user} />
            <MemberContainer title={"내 프로필"} key="me">
                {user ? <MemberItem member={user} /> : <RequireLogin />}
            </MemberContainer>
            <LayoutGroup>
                <MemberContainer
                    title={`동방 ${members?.length || 0}`}
                    key="members"
                >
                    {otherMembers?.map((member) => (
                        <MemberItem key={member._id} member={member} />
                    ))}
                </MemberContainer>
            </LayoutGroup>

            <AnimatedOutlet />
        </>
    );
};

export default MembersPage;
