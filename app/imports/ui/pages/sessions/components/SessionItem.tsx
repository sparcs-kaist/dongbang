import React, {useState} from "react";
import styles from "./SessionItem.module.css";

import {LOCATION_NAME, Session} from "/imports/db/sessions";

import {Card, CardAction, CardText, CardButton, CardBody} from "/imports/ui/components/Card";
import {renderProfileText} from "/imports/ui/components/Text";

import {joinSession, leaveSession} from "/imports/api/methods/sessions";

import {AnimatePresence, motion} from "framer-motion";
import {LocationIcon} from "/imports/assets/Icons";

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
            key={session._id}
            layoutId={session._id}
            primary={joined}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <CardBody>
                <CardAction mobile/>
                {session.location &&
                    <CardText.sub
                        location
                        style={{display: "flex", alignItems: "center", gap: 5, paddingBottom: 10}}
                    >
                        <LocationIcon/>
                        <span>{LOCATION_NAME[session.location]}</span>
                    </CardText.sub>
                }
                <CardText.main className={styles.title}>
                    {session.name}
                </CardText.main>
                
                <motion.div className={styles.members}>
                    <AnimatePresence initial={false}>
                        {session.members.map(member =>
                            <CardText.sub key={member._id}>
                                {renderProfileText(member)}
                            </CardText.sub>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <motion.div
                    initial="hidden"
                    variants={{
                        hidden: {
                            opacity: 0,
                            height: 0,
                        },
                        show: {
                            opacity: 1,
                            height: "auto"
                        },
                    }}
                    style={{display: "flex", justifyContent: "flex-end", alignItems: "center", zIndex: 5}}
                    animate={showControls ? "show" : "hidden"}
                >
                    {joined
                        ? <CardButton onClick={leave} disabled={!showControls}>나가기</CardButton>
                        : <CardButton onClick={join} disabled={!showControls}>참여</CardButton>
                    }
                </motion.div>
                
            
            </CardBody>
        </Card>
    )
}

export default SessionItem;
