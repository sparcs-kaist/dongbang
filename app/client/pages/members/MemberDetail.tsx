import React from "react";

import { useParams } from "react-router-dom";

import {
    Button,
    Drawer,
    Text,
    renderProfileText,
    Spacer,
} from "../../components";

import { MemberStatus } from "./components";

import { methods } from "/imports/api/methods";

import type { Query } from "/imports/utils/collections/types";
import type { User } from "/imports/collections/users";

interface MemberProps {
    user?: Query<User>;
    members?: Query<User>[];
}

const MemberDetail: React.FC<MemberProps> = ({ user, members }) => {
    const { username } = useParams();
    const isSelf = user?.username === username;

    const toggleStatus = () => {
        methods.members
            .updateStatus({
                isActive: !user?.isActive,
            })
            .then();
    };

    const member = isSelf
        ? user
        : members?.find((member) => member.username === username);

    return member ? (
        <Drawer>
            <Text.main>{renderProfileText(member)}</Text.main>
            <Text.sub>
                <MemberStatus member={member} />
            </Text.sub>
            <Spacer y={10} />
            {isSelf && <Button onClick={toggleStatus}>상태 변경</Button>}
        </Drawer>
    ) : (
        <></>
    );
};

export default MemberDetail;
