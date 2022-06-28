import React from "react";
import styles from "./styles.module.css";

import NavAction from "./NavAction";

import {MemberIcon, SessionIcon, ScheduleIcon} from "/imports/assets/NavIcons";

const Navigation: React.FC = () => {
    
    
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
            <NavAction to="members" icon={<MemberIcon/>}/>
            <NavAction to="sessions" icon={<SessionIcon/>}/>
            <NavAction to="schedules" icon={<ScheduleIcon/>}/>
                </div>
        </nav>
    )
}

export default Navigation;
