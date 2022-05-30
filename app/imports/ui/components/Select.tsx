import React, {Children, cloneElement, isValidElement} from "react";
import styles from "./Select.module.css"
import {ButtonProps, DivProps} from "react-html-props";
import {componentGenerator} from "/imports/ui/components/helpers/componentGenerator";
import classNames from "classnames";

export const Select = componentGenerator<Omit<DivProps, "onChange">, {value: string | undefined, onChange: (value: string | undefined) => void}>(
    "div",
    styles.selectContainer,
    ({value, onChange, children, ...props}) => ({
        ...props,
        children: Children.map(children, child => {
            if (!isValidElement(child)) {
                console.error("Child of `Select` must be `SelectItem`");
                return child;
            }
            
            return cloneElement(child, {currentValue: value, setValue: onChange});
        })
    })
);

export const SelectItem = componentGenerator<ButtonProps, {valueFor?: string, currentValue?: string, setValue?: (value: string | undefined) => void}>(
    "button",
    styles.selectItem,
    ({className, valueFor, currentValue, setValue, ...props}) => ({
        ...props,
        className: classNames(className, {[styles.selected]: valueFor === currentValue}),
        onClick: () => setValue?.(valueFor),
    })
);
