import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./Text.module.css";

import {componentGenerator} from "./helpers/componentGenerator";

export const Text = {
    main: componentGenerator("h1", styles.main),
    sub: componentGenerator("p", styles.sub),
}


export const renderProfileText = (member: Meteor.User) =>
    <>
        <span>{member.name}</span>
        <span className={styles.profileUsername}>{member.username}</span>
    </>
