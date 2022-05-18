import React, {ReactNode} from "react";
import styles from "./Drawer.module.css";

import {useNavigate} from "react-router-dom";

interface DrawerProps {
    children?: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({children}) => {
    const navigate = useNavigate();
    
    return (<>
        <div className={styles.drawer}>
            {children}
        </div>
        <div
            className={styles.backdrop}
            onClick={() => navigate("..", {replace: true})}
        />
    </>)
}

export default Drawer;
