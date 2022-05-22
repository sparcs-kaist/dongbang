import React, {useEffect, useState} from "react";

import {SessionContainer, SessionItem} from "/imports/ui/pages/sessions/components";

import {Text} from "/imports/ui/components/Text";

import {joinSession, leaveSession, startSession} from "/imports/api/methods/sessions";
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

const Sessions: React.FC<SessionsProps> = ({sessions, currentSessionId}) => {
    const [sessionGroups, setSessionGroups] = useState<SessionGroup>(
        {current: [], important: [], common: []}
    );
    
    useEffect(() => {
        const filter = (session: Session): keyof SessionGroup=> (
            currentSessionId === session._id ? "current"
                : session.location ? "important" : "common"
        );
        
        const group: SessionGroup = {current: [], important: [], common: []};
        sessions?.forEach(session => group[filter(session)].push(session));
        setSessionGroups(group);
    }, [sessions, currentSessionId, setSessionGroups]);
    
    // const
    
    
    const [name, setName] = useState("");
    
    
    const create = () => {
        startSession.call({
            name: name,
        }, (err, res) => {
            if (err) alert(err)
            else {
                console.log(res);
            }
        })
    }
    
    
    return (
        <div>
            <Text.main>세션</Text.main>
            
            <input type="text" onChange={e => setName(e.target.value)}/>
            <button onClick={create}>생성</button>
            
            <SessionContainer title="참여 중">
                {sessionGroups.current.map(session =>
                    <SessionItem
                        session={session}
                        key={session._id}
                    />
                )}
            </SessionContainer>
            
            <SessionContainer title="중요">
                {sessionGroups.important.map(session =>
                    <SessionItem
                        session={session}
                        key={session._id}
                    />
                )}
            </SessionContainer>
            
            <SessionContainer title="일반">
                {sessionGroups.common.map(session =>
                    <SessionItem
                        session={session}
                        key={session._id}
                    />
                )}
            </SessionContainer>
        </div>
    )
}

export default Sessions;
