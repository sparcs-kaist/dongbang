import React from "react";
import styles from "./styles.module.css";

import NavAction from "./NavAction";

import {MemberIcon, SessionIcon, ScheduleIcon} from "/imports/assets/NavIcons";

const Navigation: React.FC = () => {
    
    
    return (
        <nav className={styles.nav}>
            <NavAction to="members" icon={<MemberIcon/>}/>
            <NavAction to="sessions" icon={<SessionIcon/>}/>
            <NavAction to="schedule" icon={<ScheduleIcon/>}/>
        </nav>
    )
}

export default Navigation;
