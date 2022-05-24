import React from "react";
import {ElementProps} from "react-html-props";
import classNames from "classnames";

type PropRenderer<T, U> = (props: T & U) => T;

export const componentGenerator = <T extends ElementProps, U = {}>(
    element: any,
    componentClassName: string,
    propRenderer: PropRenderer<T, U> = props => props,
): React.FC<T & U> => (props) => {
    const {className, children, ...otherProps} = propRenderer(props);
    
    return React.createElement(
        element,
        {
            ...otherProps,
            className: classNames(componentClassName, className),
        },
        children
    )
};
