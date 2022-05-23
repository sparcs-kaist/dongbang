import React, {useState} from "react";
import classNames from "classnames";
import styles from "./SessionItem.module.css";

import {Session} from "/imports/db/sessions";

import {Card, CardClickable, CardText} from "/imports/ui/components/Card";
import {renderProfileText} from "/imports/ui/components/Text";

import {joinSession, leaveSession} from "/imports/api/methods/sessions";

interface SessionItemProps {
    session: Session;
    joined?: boolean;
}

const SessionItem: React.FC<SessionItemProps> = ({session, joined}) => {
    const [showControls, setShowControls] = useState<boolean>(false);
    
    const join = () => {
        joinSession.call({sessionId: session._id})
    }
    
    const leave = () => {
        leaveSession.call();
    }
    
    return (
        <Card primary={joined}>
            <CardClickable
                className={styles.item}
                tabIndex={-1}
                onFocus={() => setShowControls(true)}
                onBlur={() => setShowControls(false)}
            >
                <CardText.main className={styles.title}>{session.name}</CardText.main>
                <div className={styles.members}>
                    {session.members.map(member =>
                        <CardText.sub>
                            {renderProfileText(member)}
                        </CardText.sub>
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
            </CardClickable>
        </Card>
    )
}

export default SessionItem;
