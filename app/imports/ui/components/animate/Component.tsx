import React from "react";
import {motion} from "framer-motion";


const Component: React.FC = <T,>(props: T) => (
    <motion.div
        layout
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        {...props}
    />
)


export default Component;
