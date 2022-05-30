import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./Text.module.css";

import {componentGenerator} from "./helpers/componentGenerator";
import {HeadingProps, PProps} from "react-html-props";

export const Text = {
    main: componentGenerator<HeadingProps>("h1", styles.main),
    sub: componentGenerator<PProps>("p", styles.sub),
}


export const renderProfileText = (member: Meteor.User) =>
    <>
        <span>{member.name}</span>
        <span className={styles.profileUsername}>{member.username}</span>
    </>
