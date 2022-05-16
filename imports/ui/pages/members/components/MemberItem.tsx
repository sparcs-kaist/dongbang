import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./MemberItem.module.css";


interface MemberItemProps {
    member: Meteor.User;
}

const MemberItem: React.FC<MemberItemProps> = ({member}) => {
    
    
    return (
        <div className={styles.item}>
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
