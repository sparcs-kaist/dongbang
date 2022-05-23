import React, {useState} from "react";

import Drawer from "/imports/ui/components/Drawer";
import {startSession} from "/imports/api/methods/sessions";

const CreateSession: React.FC = () => {
    
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<Location | undefined>(undefined);
    
    
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
        <Drawer>
            <input type="text"/>
        </Drawer>
    )
}

export default CreateSession;
