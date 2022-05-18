import {Meteor} from "meteor/meteor";

import React, {ReactNode} from "react";
import styles from "./MemberItem.module.css";
import {useNavigate} from "react-router-dom";


interface MemberItemProps {
    member: Meteor.User;
}

const MemberItem: React.FC<MemberItemProps> = ({member}) => {
    const navigate = useNavigate();
    
    const userStatus: ReactNode = member.session
        ? <span>{member.session.name} 참여 중</span>
        : <span>{member.status?.message || "동방"}</span>
    
    return (
        <div
            className={styles.item}
            onClick={() => navigate(`${member.username}`, {replace: true})}
        >
            <div className={styles.inner}>
                <p className={styles.userMain}>
                    <span>{member.name}</span>
                    <span>{member.username}</span>
                </p>
                <p className={styles.userDesc}>
                    <div className={styles.indicator}/>
                    {userStatus}
                </p>
            </div>
        </div>
    )
}

export default React.memo(MemberItem);
