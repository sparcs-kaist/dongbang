import * as React from "react";

// import {SessionTitle, SessionItem} from "/imports/ui/pages/sessions/components";
import {
    SessionTitle,
    SessionItem,
} from "./components";

import {
    Text,
    List,
} from "../../components";

import AnimatedOutlet from "../../layouts/AnimatedOutlet";
import { Session } from "../../../collections/sessions";
import { Query } from "../../../modules/collections/types";

interface SessionsProps {
    sessions?: Query<Session>[];
    currentSessionId?: string;
}

const SessionsPage: React.FC<SessionsProps> = ({ sessions, currentSessionId }) => {
    const sessionGroups = sortSession(sessions, currentSessionId);
    
    return (<>
        <Text.main>세션</Text.main>
        <List>
            <SessionTitle
                key="current"
                title="참여 중"
                numSessions={sessionGroups.current.length}
            />
            {sessionGroups.current.map(session =>
                <SessionItem
                    session={session}
                    key={session._id}
                    joined
                />,
            )}
            
            <SessionTitle
                key="important"
                title="중요"
                numSessions={sessionGroups.important.length}
            />
            {sessionGroups.important.map(session =>
                <SessionItem
                    session={session}
                    key={session._id}
                />,
            )}
            
            <SessionTitle
                key="common"
                title="일반"
                numSessions={sessionGroups.common.length}
            />
            {sessionGroups.common.map(session =>
                <SessionItem
                    session={session}
                    key={session._id}
                />,
            )}
        </List>
        <AnimatedOutlet/>
    </>);
};

interface SessionGroup {
    current: Query<Session>[];
    important: Query<Session>[];
    common: Query<Session>[];
}

const sortSession = (sessions: Query<Session>[] | undefined, currentSessionId: string | undefined) => {
    const filter = (session: Query<Session>): keyof SessionGroup => (
        currentSessionId === session._id ? "current"
            : session.location ? "important" : "common"
    );
    
    const group: SessionGroup = { current: [], important: [], common: [] };
    sessions?.forEach(session => group[filter(session)].push(session));
    return group;
};

export default SessionsPage;
