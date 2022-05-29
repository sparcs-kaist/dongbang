import React from "react";
import {TransitionGroup} from "react-transition-group";

import {Session} from "/imports/db/sessions";

import SessionItem from "./SessionItem";
import {Text} from "/imports/ui/components/Text";

interface SessionsProps {
    title: string;
    sessions: Session[];
    joined?: boolean;
}

const Sessions: React.FC<SessionsProps> = ({title, sessions, joined}) => {
    
    return (
        <div>
            <Text.sub>{title}</Text.sub>
            <TransitionGroup appear={false}>
                {sessions.map(session =>
                    <SessionItem
                        key={session._id}
                        session={session}
                        joined={joined}
                    />
                )}
            </TransitionGroup>
        </div>
    )
}


export default Sessions;
