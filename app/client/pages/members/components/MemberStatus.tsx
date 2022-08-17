import React, { ReactNode } from "react";

import { Query } from "/imports/utils/collections/types";
import { User } from "/imports/collections/users";
import { Status, msg, Color } from "../../../components";

interface MemberStatusProps {
    member: Query<User>;
}

const MemberStatus: React.FC<MemberStatusProps> = ({
    member: { session, isActive, statusMsg },
}) => {
    const [color, message]: [Color, ReactNode] = session
        ? session.location
            ? ["red", msg`${session.location}에서 ${session.name} 참여 중`]
            : ["yellow", msg`${session.name} 참여 중`]
        : isActive
        ? ["green", msg`${statusMsg || "동방"}`]
        : [null, msg`${statusMsg || "오프라인"}`];

    return <Status color={color}>{message}</Status>;
};

export default MemberStatus;
