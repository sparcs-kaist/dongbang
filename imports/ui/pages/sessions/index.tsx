import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";

import {sessionQuery} from "/imports/api/publications/sessions";

import {createSession} from "/imports/api/methods/sessions";

const Sessions: React.FC = () => {
    
    const [name, setName] = useState("");
    
    const sessions = useTracker(() => {
        const query = sessionQuery.clone();
        const handler = query.subscribe();
        
        if (!handler.ready()) {
            return []
        }
        
        return query.fetch()
    });
    
    console.log(sessions)
    
    const create = () => {
        createSession.call({
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
            <h1>세션</h1>
    
            <input type="text" onChange={e => setName(e.target.value)}/>
            <button onClick={create}>생성</button>
            
            <ul>
                {sessions.map(session =>
                    <li>
                        <h3>{session.name}</h3>
                        <div>
                            {session.members.map(member =>
                                <p>{member.name}</p>
                            )}
                        </div>
                    </li>
                )}
            </ul>
            
        </div>
    )
}

export default Sessions;
