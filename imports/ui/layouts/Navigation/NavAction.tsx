import React, {ReactNode} from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

import {NavLink} from "react-router-dom";


interface NavActionProps {
    to: string;
    // children: ReactNode;
    icon: ReactNode
}

const NavAction: React.FC<NavActionProps> = ({to, icon}) => {
    
    
    
    return (
        <NavLink
            to={to}
            className={({isActive}) => classNames({[styles.active]: isActive})}
        >
            <div className={styles.touch}>{icon}</div>
        </NavLink>
    )
}

export default NavAction;
