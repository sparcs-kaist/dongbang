import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./Member.module.css";

import Drawer from "/imports/ui/components/Drawer";
import {Text, renderProfileText} from "/imports/ui/components/Text";

import {useParams} from "react-router-dom";


interface MemberProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const Member: React.FC<MemberProps> = ({user, members}) => {
    const {username} = useParams();
    const isSelf = user?.username === username;
    
    
    const member = isSelf
        ? user
        : members?.find(member => member.username === username);
    
    return (
        <Drawer>
            {member ? <>
                <Text.main>{renderProfileText(member)}</Text.main>
            </> : <>
            
            
            </>}
        </Drawer>
    )
}

export default Member;
