import React from "react";
import styles from "./SessionContainer.module.css"

const SessionContainer: React.FC = (
    {children}
) => (
    <div className={styles.root}>
        <div className={styles.container}>{children}</div>
    </div>
)


export default SessionContainer;
