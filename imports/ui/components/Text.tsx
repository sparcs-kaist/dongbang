import React from "react";
import styles from "./Text.module.css";

const MainText: React.FC<{children: string}> = ({children}) =>
    <h1 className={styles.main}>{children}</h1>

const SubText: React.FC<{children: string}> = ({children}) =>
    <h2 className={styles.sub}>{children}</h2>

export const Text = {
    main: MainText,
    sub: SubText,
}
