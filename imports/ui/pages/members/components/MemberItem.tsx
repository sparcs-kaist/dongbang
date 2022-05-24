import {Meteor} from "meteor/meteor";

import React, {ReactNode} from "react";
import styles from "./MemberItem.module.css";

import {CardClickable, CardText} from "/imports/ui/components/Card";
import {renderProfileText} from "/imports/ui/components/Text";

import {useNavigate} from "react-router-dom";

import {LOCATION_NAME} from "/imports/db/sessions";
import classNames from "classnames";


interface MemberItemProps {
    member: Meteor.User;
}


const MemberItem: React.FC<MemberItemProps> = ({member}) => {
    const navigate = useNavigate();
    
    const userStatus: ReactNode = member.session
        ? member.session.location
            ? <MemberStatus className={styles.statusLocation}>
                <span>
                    {LOCATION_NAME[member.session.location]}
                </span>에서&nbsp;<span>{member.session.name}</span>&nbsp;참여 중
            </MemberStatus>
            : <MemberStatus className={styles.statusSession}>
                <span>{member.session.name}</span>&nbsp;참여 중
            </MemberStatus>
        : member.isActive
            ? <MemberStatus className={styles.statusActive}>
                <span>{member?.statusMsg || "동방"}</span>
            </MemberStatus>
            : <MemberStatus>
                <span>{member?.statusMsg || "오프라인"}</span>
            </MemberStatus>
    
    return (
        <CardClickable
            className={styles.item}
            onClick={() => navigate(`${member.username}`, {replace: true})}
        >
            <div className={styles.inner}>
                <CardText.main>
                    {renderProfileText(member)}
                </CardText.main>
                {userStatus}
            </div>
        </CardClickable>
    )
}

const MemberStatus: React.FC<{ className?: string }> = ({className, children}) => (
    <CardText.sub className={classNames(styles.userDesc, className)}>
        <span className={styles.indicator}/>
        {children}
    </CardText.sub>
)


export default React.memo(MemberItem);
