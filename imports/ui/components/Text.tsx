import {Meteor} from "meteor/meteor";

import React, {HTMLAttributes} from "react";
import classNames from "classnames";
import styles from "./Text.module.css";

type TextComponent = React.FC<HTMLAttributes<HTMLParagraphElement>>;

interface TextComponents {
    main: TextComponent;
    sub: TextComponent;
}

const textComponentGenerator = (componentClassName: string): TextComponent =>
    ({children, className, ...props}) =>
        <p className={classNames(componentClassName, className)} {...props}>{children}</p>

export const Text: TextComponents = {
    main: textComponentGenerator(styles.main),
    sub: textComponentGenerator(styles.sub),
}

export const CardText: TextComponents = {
    main: textComponentGenerator(styles.mainCard),
    sub: textComponentGenerator(styles.subCard),
}


export const renderProfileText = (member: Meteor.User) =>
    <>
        <span>{member.name}</span>
        <span className={styles.profileUsername}>{member.username}</span>
    </>
