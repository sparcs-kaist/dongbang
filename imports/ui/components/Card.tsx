import React from "react";
import styles from "./Card.module.css";
import classNames from "classnames";

import {CommonProps} from "./commonProps";

interface PaperProps extends CommonProps {
    clickable?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<PaperProps> = (
    {children, className}
) => (
    <div className={classNames(styles.card, className)}>
        {children}
    </div>
);
