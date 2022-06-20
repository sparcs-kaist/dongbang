import React from "react";
import {HTMLMotionProps, motion} from "framer-motion";


const Component: React.FC<HTMLMotionProps<"div">> = <T,>(props: T) => (
    <motion.div
        layout
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        {...props}
    />
)


export default Component;
