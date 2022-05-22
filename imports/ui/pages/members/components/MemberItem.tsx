import {Meteor} from "meteor/meteor";

import React, {ReactNode} from "react";
import styles from "./MemberItem.module.css";

import {CardText, renderProfileText} from "/imports/ui/components/Text";

import {useNavigate} from "react-router-dom";


interface MemberItemProps {
    member: Meteor.User;
}

const MemberItem: React.FC<MemberItemProps> = ({member}) => {
    const navigate = useNavigate();
    
    const userStatus: ReactNode = member.session
        ? <span>{member.session.name} 참여 중</span>
        : <span>{member?.statusMsg || "동방"}</span>
    
    return (
        <div
            className={styles.item}
            onClick={() => navigate(`${member.username}`, {replace: true})}
        >
            <div className={styles.inner}>
                <CardText.main>
                    {renderProfileText(member)}
                </CardText.main>

                <CardText.sub className={styles.userDesc}>
                    <div className={styles.indicator}/>
                    {userStatus}
                </CardText.sub>
            </div>
        </div>
    )
}

export default React.memo(MemberItem);
