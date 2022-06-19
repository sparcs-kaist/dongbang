import React from "react";
import {Outlet} from "react-router-dom";

import {SessionTitle, SessionItem} from "/imports/ui/pages/sessions/components";
import {Text} from "/imports/ui/components/Text";

import {Session} from "/imports/db/sessions";
import {AnimatePresence, LayoutGroup} from "framer-motion";

interface SessionsProps {
    sessions?: Session[];
    currentSessionId?: string;
}

const SessionsPage: React.FC<SessionsProps> = ({sessions, currentSessionId}) => {
    const sessionGroups = sortSession(sessions, currentSessionId);
    
    return (
        <div>
            <Text.main>세션</Text.main>
            
            <div style={{display: "flex", flexDirection: "column"}}>
                <LayoutGroup>
                    <AnimatePresence initial={false}>
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
                            />
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
                            />
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
                            />
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
            <Outlet/>
        </div>
    )
}

interface SessionGroup {
    current: Session[];
    important: Session[];
    common: Session[];
}

const sortSession = (sessions: Session[] | undefined, currentSessionId: string | undefined) => {
    const filter = (session: Session): keyof SessionGroup => (
        currentSessionId === session._id ? "current"
            : session.location ? "important" : "common"
    );
    
    const group: SessionGroup = {current: [], important: [], common: []};
    sessions?.forEach(session => group[filter(session)].push(session));
    return group;
}

export default SessionsPage;
