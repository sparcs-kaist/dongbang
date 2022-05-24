import React from "react";
import styles from "./Input.module.css";

import {componentGenerator} from "/imports/ui/components/helpers/componentGenerator";
import {InputProps} from "react-html-props";


export const Input = componentGenerator<InputProps>("input", styles.input);
