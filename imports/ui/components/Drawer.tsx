import React, {useEffect, useState} from "react";
import styles from "./Drawer.module.css";

import {useNavigate} from "react-router-dom";

interface DrawerProps {
    close?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({children, close}) => {
    const navigate = useNavigate();
    
    type State = typeof styles.open | typeof styles.close | null;
    const [animationState, setAnimationState] = useState<State>(styles.open);
    
    
    
    
    const onAnimationEnd = () => {
        switch (animationState) {
            case styles.open:
                setAnimationState(null);
                break;
            case styles.close:
                navigate("..", {replace: true})
                break;
        }
    }
    
    useEffect(() => {
        if (close) setAnimationState(styles.close);
    }, [close]);
    
    return (<div className={animationState}>
        <div className={styles.drawer} onAnimationEnd={onAnimationEnd}>
            {children}
        </div>
        <div
            className={styles.backdrop}
            onClick={() => setAnimationState(styles.close)}
        />
    </div>)
}

export default Drawer;
