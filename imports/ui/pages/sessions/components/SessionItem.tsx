import React, {useState} from "react";
import classNames from "classnames";
import styles from "./SessionItem.module.css";


import {Session} from "/imports/db/sessions";

import {Card} from "/imports/ui/components/Card";

import {joinSession, leaveSession} from "/imports/api/methods/sessions";

interface SessionItemProps {
    session: Session;
}

const SessionItem: React.FC<SessionItemProps> = ({session}) => {
    const [showControls, setShowControls] = useState<boolean>(false);
    
    const join = () => {
        joinSession.call({sessionId: session._id})
    }
    
    const leave = () => {
        leaveSession.call();
    }
    
    return (
        <Card
            className={styles.item}
            tabIndex={-1}
            onFocus={() => setShowControls(true)}
            onBlur={() => setShowControls(false)}
        >
            <p className={styles.title}>{session.name}</p>
            <div className={styles.members}>
                {session.members.map(member =>
                    <span>{member.name}</span>
                )}
            </div>
            
            <div
                className={classNames(
                    styles.controls,
                    {[styles.show]: showControls}
                )}
            >
                <button onClick={join}>참여</button>
                <button onClick={leave}>나가기</button>
            </div>
        </Card>
    )
}

export default SessionItem;
