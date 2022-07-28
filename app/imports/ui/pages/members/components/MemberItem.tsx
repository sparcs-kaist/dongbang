import React from "react";

import { CardAction, CardBody, CardText } from "/imports/ui/components/Card";
import { renderProfileText } from "/imports/ui/components/Text";
import MemberStatus from "./MemberStatus";

import { useNavigate } from "react-router-dom";
import { Query } from "../../../../modules/collections/types";
import { User } from "../../../../collections/users";

interface MemberItemProps {
    member: Query<User>;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    const navigate = useNavigate();
    
    return (
        <CardBody
            layout
            key={member._id}
        >
            <CardAction onClick={() => navigate(`${member.username}`)}/>
            <CardText.main>
                {renderProfileText(member)}
            </CardText.main>
            <CardText.sub>
                <MemberStatus member={member}/>
            </CardText.sub>
        </CardBody>
    );
};
export default React.memo(MemberItem);
