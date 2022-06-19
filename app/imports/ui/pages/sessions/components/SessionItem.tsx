import React, {useState} from "react";
import classNames from "classnames";
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
            tabIndex={-1}
            onFocus={() => setShowControls(true)}
            onBlur={() => setShowControls(false)}
            className={classNames(styles.root, {[styles.show]: showControls}, styles.item)}
        >
            <CardBody>
                <CardAction/>
                {session.location &&
                    <CardText.sub
                        location
                        style={{display: "flex", alignItems: "center", gap: 5, paddingBottom: 10}}
                    >
                        <LocationIcon/>
                        <span>{LOCATION_NAME[session.location]}</span>
                    </CardText.sub>
                }
                <CardText.main className={styles.title}>{session.name}</CardText.main>
                
                <div className={styles.members}>
                    <AnimatePresence initial={false}>
                        {session.members.map(member =>
                            <motion.div
                                layout
                                key={session._id + member._id}
                                // layoutId={session._id + (joined ? "joined" : "no")}
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: "auto"}}
                                exit={{opacity: 0, height: 0}}
                            >
                                
                                <CardText.sub key={member._id}>
                                    {renderProfileText(member)}
                                </CardText.sub>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
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
                    style={{display: "flex", justifyContent: "flex-end", overflow: "hidden"}}
                    animate={showControls ? "show" : "hidden"}
                    // className={styles.controls}
                >
                    {joined
                        ? <CardButton onClick={leave}>나가기</CardButton>
                        : <CardButton onClick={join}>참여</CardButton>
                    }
                </motion.div>
            </CardBody>
        </Card>
    )
}

export default SessionItem;
