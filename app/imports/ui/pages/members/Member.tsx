import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./Member.module.css";

import {useParams} from "react-router-dom";

import Drawer from "/imports/ui/components/Drawer";
import {Text, renderProfileText} from "/imports/ui/components/Text";
import {Button} from "/imports/ui/components/Button";

import {updateStatus} from "/imports/api/methods/members";


interface MemberProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const Member: React.FC<MemberProps> = ({user, members}) => {
    const {username} = useParams();
    const isSelf = user?.username === username;
    
    const toggleStatus = () => {
        updateStatus.call({
            isActive: !user?.isActive,
        });
    }
    
    
    const member = isSelf
        ? user
        : members?.find(member => member.username === username);
    
    return (
        <Drawer className={styles.root}>
            {member ? <>
                <Text.main>{renderProfileText(member)}</Text.main>
    
    
                {isSelf && <div className={styles.buttonContainer}>
                    <Button onClick={toggleStatus}>상태 변경</Button>
                </div>}
                
            </> : <>
            
            
            </>}
        </Drawer>
    )
}

export default Member;
