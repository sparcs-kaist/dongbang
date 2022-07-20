import * as React from "react";
import {motion, HTMLMotionProps} from "framer-motion";

interface CollapseProps extends HTMLMotionProps<"div"> {
    show: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({show, ...props}) => (
    <motion.div
        initial="hidden"
        variants={{
            hidden: {
                opacity: 0,
                height: 0,
            },
            show: {
                opacity: 1,
                height: "auto"
            },
        }}
        animate={show ? "show" : "hidden"}
        {...props}
    />
);
