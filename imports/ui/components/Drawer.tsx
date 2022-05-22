import React, {ReactNode, useState} from "react";
import styles from "./Drawer.module.css";

import {useNavigate} from "react-router-dom";

interface DrawerProps {
    children?: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({children}) => {
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
