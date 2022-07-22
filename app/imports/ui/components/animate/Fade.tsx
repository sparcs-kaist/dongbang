import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const Fade: React.FC<HTMLMotionProps<"div">> = (props) => (
    <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
    />
);
