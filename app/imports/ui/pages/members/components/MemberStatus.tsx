import {Meteor} from "meteor/meteor";

import React from "react";
import classNames from "classnames";
import styles from "./MemberStatus.module.css";

import {LOCATION_NAME} from "/imports/db/sessions";

interface MemberStatusProps {
    member: Meteor.User;
}

enum Status {
    LOCATION,
    SESSION,
    ACTIVE,
    OFFLINE,
}

const statusSettings = (
    {session, location, message}: { session?: string, location?: string, message?: string }
) => ({
    [Status.LOCATION]: {
        className: styles.statusLocation,
        component: <>
            <span>{location}</span>에서&nbsp;<span>{session}</span>&nbsp;참여&nbsp;중
        </>
    },
    [Status.SESSION]: {
        className: styles.statusSession,
        component: <>
            <span>{session}</span>&nbsp;참여&nbsp;중
        </>
    },
    [Status.ACTIVE]: {
        className: styles.statusActive,
        component: <>
            <span>{message || "동방"}</span>
        </>
    },
    [Status.OFFLINE]: {
        className: "",
        component: <>
            <span>{message || "오프라인"}</span>
        </>
    },
})

const MemberStatus: React.FC<MemberStatusProps> = ({member}) => {
    const {className, component} = statusSettings({
        session: member.session?.name,
        location: member.session?.location && LOCATION_NAME[member.session.location],
        message: member.statusMsg,
    })[member.session
        ? member.session.location
            ? Status.LOCATION
            : Status.SESSION
        : member.isActive
            ? Status.ACTIVE
            : Status.OFFLINE
        ]
    
    
    return (
        <div className={classNames(styles.userDesc, className)}>
            <span className={styles.indicator}/>
            {component}
        </div>
    )
}

export default MemberStatus;
