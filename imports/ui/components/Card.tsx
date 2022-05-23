import React from "react";
import styles from "./Card.module.css";
import {componentGenerator} from "./helpers/componentGenerator";

interface CardProps {
    // clickable?: boolean;
    primary?: boolean;
}

export const Card = componentGenerator<CardProps>(
    "div",
    styles.card,
    ({primary}) => ({[styles.primary]: primary})
);

export const CardClickable = componentGenerator("div", styles.clickable)


export const CardText = {
    main: componentGenerator("h2", styles.mainText),
    sub: componentGenerator("p", styles.subText),
}
