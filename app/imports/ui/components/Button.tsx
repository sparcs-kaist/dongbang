import React from "react";
import styles from "./Button.module.css";

import {componentGenerator} from "/imports/ui/components/helpers/componentGenerator";
import {ButtonProps} from "react-html-props";

export const Button = componentGenerator<ButtonProps>("button", styles.button);
