import React, {ReactNode} from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

import {NavLink} from "react-router-dom";


interface NavActionProps {
    to: string;
    children: ReactNode;
}

const NavAction: React.FC<NavActionProps> = ({to, children}) => {
    
    
    
    return (
        <NavLink
            to={to}
            className={({isActive}) => classNames({[styles.active]: isActive})}
        >
            {children}
        </NavLink>
    )
}

export default NavAction;
