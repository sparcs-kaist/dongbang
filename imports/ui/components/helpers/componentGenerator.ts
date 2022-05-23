import React, {HTMLAttributes} from "react";
import classNames from "classnames";

import {Argument} from "classnames";

export const componentGenerator = <T, U = any>(
    element: any,
    componentClassName: string,
    dynamicClassName?: (props: T & HTMLAttributes<U>) => Argument,
): React.FC<T & HTMLAttributes<U>> => (props) => {
    const {className, children, ...otherProps} = props;
    
    return React.createElement(
        element,
        {
            ...otherProps,
            className: classNames(
                componentClassName,
                className,
                dynamicClassName?.(props),
            ),
        },
        children
    )
};
