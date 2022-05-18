import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./MemberItem.module.css";
import {useNavigate} from "react-router-dom";


interface MemberItemProps {
    member: Meteor.User;
}

const MemberItem: React.FC<MemberItemProps> = ({member}) => {
    const navigate = useNavigate();
    
    return (
        <div
            className={styles.item}
            onClick={() => navigate(`${member.username}`, {replace: true})}
        >
            <div className={styles.inner}>
                <p>
                    {member.name}
                </p>
                <p>
                
                </p>
            </div>
        </div>
    )
}

export default React.memo(MemberItem);
