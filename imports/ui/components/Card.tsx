import React, {HTMLAttributes} from "react";
import styles from "./Card.module.css";
import classNames from "classnames";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
    clickable?: boolean;
}

export const Card: React.FC<PaperProps> = (
    {children, className, ...props}
) => (
    <div className={classNames(styles.card, className)} {...props}>
        {children}
    </div>
);
