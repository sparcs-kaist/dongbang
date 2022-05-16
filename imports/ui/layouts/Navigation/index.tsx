import React from "react";
import styles from "./styles.module.css";

import NavAction from "./NavAction";

const Navigation: React.FC = () => {
    
    
    return (
        <nav className={styles.nav}>
            <NavAction to="/">
                members
            </NavAction>
            <NavAction to="sessions">
                sessions
            </NavAction>
        </nav>
    )
}

export default Navigation;
