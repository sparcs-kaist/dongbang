import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

import {SessionContainer, Sessions} from "/imports/ui/pages/sessions/components";
import {Text} from "/imports/ui/components/Text";

import {Session} from "/imports/db/sessions";

interface SessionsProps {
    sessions?: Session[];
    currentSessionId?: string;
}

interface SessionGroup {
    current: Session[];
    important: Session[];
    common: Session[];
}

const SessionsPage: React.FC<SessionsProps> = ({sessions, currentSessionId}) => {
    const [sessionGroups, setSessionGroups] = useState<SessionGroup>(
        {current: [], important: [], common: []}
    );
    
    useEffect(() => {
        const filter = (session: Session): keyof SessionGroup => (
            currentSessionId === session._id ? "current"
                : session.location ? "important" : "common"
        );
        
        const group: SessionGroup = {current: [], important: [], common: []};
        sessions?.forEach(session => group[filter(session)].push(session));
        setSessionGroups(group);
    }, [sessions, currentSessionId, setSessionGroups]);
    
    return (
        <div>
            <Text.main>세션</Text.main>
            
            <SessionContainer>
                <Sessions
                    title="참여 중"
                    sessions={sessionGroups.current}
                    joined
                />
                <Sessions
                    title="중요"
                    sessions={sessionGroups.important}
                />
                <Sessions
                    title="일반"
                    sessions={sessionGroups.common}
                />
            </SessionContainer>
            
            
            {/*<SessionContainer title="중요">*/}
            {/*    {sessionGroups.important.map(session =>*/}
            {/*        <SessionItem*/}
            {/*            session={session}*/}
            {/*            key={session._id}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</SessionContainer>*/}
            
            {/*<SessionContainer title="일반">*/}
            {/*    {sessionGroups.common.map(session =>*/}
            {/*        <SessionItem*/}
            {/*            session={session}*/}
            {/*            key={session._id}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</SessionContainer>*/}
            <Outlet/>
        </div>
    )
}

export default SessionsPage;
