import React, {ReactNode} from "react";
import styles from "./paper.module.css";


interface PaperProps {
    children?: ReactNode;
}

export const Paper: React.FC<PaperProps> = ({children}) => {
    
    
    return (
        <div className={styles.paper}>
            {children}
        </div>
    )
}
