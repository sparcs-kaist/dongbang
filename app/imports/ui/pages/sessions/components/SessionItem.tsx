import React from "react";
import { useState } from "react";
import styles from "./SessionItem.module.css";

// import {LOCATION_NAME, Session} from "/imports/collections/sessions";

import {
    Card,
    CardAction,
    CardText,
    CardButton,
    CardBody,
    List,
    renderProfileText,
} from "../../../components";

import { Collapse } from "../../../components/animate";

import { joinSession, leaveSession } from "../../../../api/methods/sessions";

import { LocationIcon } from "../../../../assets";

import type { Query } from "/imports/modules/collections";
import type { Session } from "/imports/collections/sessions";

interface SessionItemProps {
    session: Query<Session>;
    joined?: boolean;
}

const SessionItem: React.FC<SessionItemProps> = ({ session, joined }) => {
    const [showControls, setShowControls] = useState<boolean>(false);

    const join = () => {
        joinSession.call({ sessionId: session._id });
    };

    const leave = () => {
        leaveSession.call();
    };

    return (
        <Card
            key={session._id}
            layoutId={session._id}
            primary={joined}
            onClick={() => setShowControls(true)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <CardBody>
                <CardAction mobile />
                {session.location && (
                    <CardText.sub
                        location
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            paddingBottom: 10,
                        }}
                    >
                        <LocationIcon />
                        <span>{session.location}</span>
                    </CardText.sub>
                )}
                <CardText.main className={styles.title}>
                    {session.name}
                </CardText.main>

                <List>
                    {session.members.map((member) => (
                        <CardText.sub key={member._id}>
                            {renderProfileText(member)}
                        </CardText.sub>
                    ))}
                </List>

                <Collapse
                    show={showControls}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        zIndex: 5,
                    }}
                >
                    {joined ? (
                        <CardButton onClick={leave} disabled={!showControls}>
                            나가기
                        </CardButton>
                    ) : (
                        <CardButton onClick={join} disabled={!showControls}>
                            참여
                        </CardButton>
                    )}
                </Collapse>
            </CardBody>
        </Card>
    );
};

export default SessionItem;
