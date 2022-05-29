import React, {useEffect, useState} from "react";
import styles from "./Drawer.module.css";

import {useNavigate} from "react-router-dom";
import {DivProps} from "react-html-props";
import classNames from "classnames";

interface DrawerProps extends DivProps {
    close?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({children, close, className, ...props}) => {
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
    
    return (<div className={animationState} >
        <div
            className={classNames(styles.drawer, className)}
            onAnimationEnd={onAnimationEnd}
            {...props}
        >
            {children}
        </div>
        <div
            className={styles.backdrop}
            onClick={() => setAnimationState(styles.close)}
        />
    </div>)
}

export default Drawer;
