import React, {useState} from "react";
import classNames from "classnames";
import styles from "./SessionItem.module.css";

import {Session} from "/imports/db/sessions";

import {Card, CardClickable, CardText, CardButton} from "/imports/ui/components/Card";
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
        <Card
            primary={joined}
            tabIndex={-1}
            onFocus={() => setShowControls(true)}
            onBlur={() => setShowControls(false)}
            className={classNames(styles.root, {[styles.show]: showControls})}
        >
            <CardClickable className={styles.item}>
                <CardText.main className={styles.title}>{session.name}</CardText.main>
                <div className={styles.members}>
                    {session.members.map(member =>
                        <CardText.sub key={member._id}>
                            {renderProfileText(member)}
                        </CardText.sub>
                    )}
                </div>
                
                <div className={styles.controlSpace}/>
            </CardClickable>
            <div className={styles.controls}>
                {joined
                    ? <CardButton onClick={leave}>나가기</CardButton>
                    : <CardButton onClick={join}>참여</CardButton>
                }
            </div>
        </Card>
    )
}

export default SessionItem;
