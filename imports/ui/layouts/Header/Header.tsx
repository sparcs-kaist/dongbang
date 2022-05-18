import React from "react";
import styles from "./styles.module.css";


import {Logo} from "/imports/assets/Logo";
import {MemberIcon} from "/imports/assets/NavIcons";

import {Link} from "react-router-dom";
import HeaderAction from "/imports/ui/layouts/Header/HeaderAction";

const Header: React.FC = () => {
    
    
    return (
        <header className={styles.header}>
            <div className={styles.topBorder}/>
            <div className={styles.content}>
                <Logo className={styles.logo}/>
                <div className={styles.actions}>
                    <HeaderAction path="members">
                        <Link to="login">
                            <MemberIcon/>
                        </Link>
                    </HeaderAction>
                    <HeaderAction path="sessions">
                        create
                    </HeaderAction>
                </div>
            </div>
        
        </header>
    )
}

export default Header;
