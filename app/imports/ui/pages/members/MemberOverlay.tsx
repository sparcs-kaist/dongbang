import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./MemberOverlay.css";

import {useParams} from "react-router-dom";

import Drawer from "/imports/ui/components/Drawer";
import {Text, renderProfileText} from "/imports/ui/components/Text";
import {Button} from "/imports/ui/components/Button";
import MemberStatus from "/imports/ui/pages/members/components/MemberStatus";

import {updateStatus} from "/imports/api/methods/members";


interface MemberProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const MemberOverlay: React.FC<MemberProps> = ({user, members}) => {
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
                <div>
                    <Text.main>
                        {renderProfileText(member)}
                    </Text.main>
                    <Text.sub className={styles.status}>
                        <MemberStatus member={member}/>
                    </Text.sub>
                </div>
                
                
                {isSelf && <div className={styles.buttonContainer}>
                    <Button onClick={toggleStatus}>상태 변경</Button>
                </div>}
            
            </> : <>
            
            
            </>}
        </Drawer>
    )
}

export default MemberOverlay;
