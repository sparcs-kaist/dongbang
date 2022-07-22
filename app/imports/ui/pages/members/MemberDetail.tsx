import React from "react";
import styles from "./MemberOverlay.module.css";

import { useParams } from "react-router-dom";

import {
    Button,
    Drawer,
    Text,
    renderProfileText,
} from "../../components";

import MemberStatus from "./components/MemberStatus";

import { updateStatus } from "../../../api/methods/members";

import type { Query } from "/imports/modules/collections/types";
import type { User } from "../../../collections/users";

interface MemberProps {
    user?: Query<User>;
    members?: Query<User>[];
}

const MemberDetail: React.FC<MemberProps> = ({ user, members }) => {
    const { username } = useParams();
    const isSelf = user?.username === username;
    
    const toggleStatus = () => {
        updateStatus.call({
            isActive: !user?.isActive,
        });
    };
    
    const member = isSelf
        ? user
        : members?.find(member => member.username === username);
    
    return (member ? <Drawer>
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
    
    </Drawer> : <>
    
    
    </>);
};

export default MemberDetail;
