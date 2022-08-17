import React from "react";

import {
    CardAction,
    CardBody,
    CardText,
    renderProfileText,
} from "../../../components";

import { MemberStatus } from "./MemberStatus";

import { useNavigate } from "react-router-dom";
import type { Query } from "/imports/utils/collections";
import type { User } from "/imports/collections/users";

interface MemberItemProps {
    member: Query<User>;
}

export const MemberItem: React.FC<MemberItemProps> = React.memo(
    ({ member }) => {
        const navigate = useNavigate();

        return (
            <CardBody layout key={member._id}>
                <CardAction onClick={() => navigate(`${member.username}`)} />
                <CardText.main>{renderProfileText(member)}</CardText.main>
                <CardText.sub>
                    <MemberStatus member={member} />
                </CardText.sub>
            </CardBody>
        );
    },
);
