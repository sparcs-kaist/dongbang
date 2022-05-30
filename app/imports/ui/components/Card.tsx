import React from "react";
import styles from "./Card.module.css";
import {componentGenerator} from "./helpers/componentGenerator";
import {ButtonProps, DivProps, HeadingProps, PProps} from "react-html-props";
import classNames from "classnames";


export const Card = componentGenerator<DivProps, { primary?: boolean }>(
    "div",
    styles.card,
    ({primary, className, ...props}) => ({
        ...props,
        className: classNames({[styles.primary]: primary}, className),
    }),
);

export const CardClickable = componentGenerator<DivProps>("div", styles.clickable);


export const CardButton = componentGenerator<ButtonProps, { transparent?: boolean }>(
    "button",
    styles.button,
    ({transparent, className, ...props}) => ({
        ...props,
        className: classNames({[styles.transparent]: transparent}, className),
    }),
);

export const CardText = {
    main: componentGenerator<HeadingProps>("h2", styles.mainText),
    sub: componentGenerator<PProps>("p", styles.subText),
}
