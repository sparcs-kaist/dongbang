import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

import {SessionContainer, SessionItem} from "/imports/ui/pages/sessions/components";
import {Text} from "/imports/ui/components/Text";

import {Session} from "/imports/db/sessions";
import {LayoutGroup} from "framer-motion";

interface SessionsProps {
    sessions?: Session[];
    currentSessionId?: string;
}

interface SessionGroup {
    current: Session[];
    important: Session[];
    common: Session[];
}

const Sessions: React.FC<SessionsProps> = ({sessions, currentSessionId}) => {
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
    
    console.log(sessions)
    
    return (
        <div>
            <Text.main>세션</Text.main>
            
            <div style={{display: "flex", flexDirection: "column"}}>
                <LayoutGroup>
                    
                    <SessionContainer title="참여 중" key="current">
                        {sessionGroups.current.map(session =>
                            <SessionItem
                                session={session}
                                key={session._id}
                                joined
                            />
                        )}
                    </SessionContainer>
                    
                    <SessionContainer title="중요" key="important">
                        {sessionGroups.important.map(session =>
                            <SessionItem
                                session={session}
                                key={session._id}
                            />
                        )}
                    </SessionContainer>
                    
                    <SessionContainer title="일반" key="common">
                        {sessionGroups.common.map(session =>
                            <SessionItem
                                session={session}
                                key={session._id}
                            />
                        )}
                    </SessionContainer>
                    
                </LayoutGroup>
            </div>
            <Outlet/>
        </div>
    )
}

export default Sessions;
