import React from "react";
import styles from "./styles.module.css";


import {Logo} from "/imports/assets/Logo";
import {MemberIcon, CreateIcon} from "/imports/assets/NavIcons";

import HeaderAction from "/imports/ui/layouts/Header/HeaderAction";

const Header: React.FC = () => {
    
    
    return (
        <header className={styles.header}>
            <div className={styles.topBorder}/>
            <div className={styles.content}>
                <Logo className={styles.logo}/>
                <div className={styles.actions}>
                    <HeaderAction path="members" to="login" icon={<MemberIcon/>}/>
                    <HeaderAction path="sessions" to="sessions/create" icon={<CreateIcon/>}/>
                    <HeaderAction path="schedules" to="" icon={<CreateIcon/>}/>
                </div>
            </div>
        
        </header>
    )
}

export default Header;
