import React, {ButtonHTMLAttributes} from "react";
import styles from "./Card.module.css";
import {componentGenerator} from "./helpers/componentGenerator";


export const Card = componentGenerator<{ primary?: boolean }>(
    "div",
    styles.card,
    ({primary}) => ({[styles.primary]: primary}),
);

export const CardClickable = componentGenerator("div", styles.clickable);


export const CardButton = componentGenerator<{ transparent?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>(
    "button",
    styles.button,
    ({transparent}) => ({[styles.transparent]: transparent}),
);

export const CardText = {
    main: componentGenerator("h2", styles.mainText),
    sub: componentGenerator("p", styles.subText),
}
