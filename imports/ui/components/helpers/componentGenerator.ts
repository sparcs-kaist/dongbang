import React, {HTMLAttributes} from "react";
import classNames from "classnames";

import {Argument} from "classnames";

export const componentGenerator = <T>(
    element: any,
    componentClassName: string,
    dynamicClassName?: (props: any) => Argument,
): React.FC<T & HTMLAttributes<any>> => (
    {className, children, ...props}
) => (
    React.createElement(
        element,
        {
            ...props,
            className: classNames(
                componentClassName,
                className,
                dynamicClassName?.(props),
            ),
        },
        children
    )
);
