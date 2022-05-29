import React, {Children, ReactNode} from "react";
import {motion, AnimatePresence} from "framer-motion";


import {Text} from "/imports/ui/components/Text";

interface SessionContainerProps {
    title: string;
    children: ReactNode;
}

const SessionContainer: React.FC<SessionContainerProps> = (
    {title, children}
) => {
    return (
        <AnimatePresence initial={false}>
            {Children.count(children) > 0 ? <motion.div
                layout
                key={title}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Text.sub>{title}</Text.sub>
            </motion.div> : null}
            {children}
        </AnimatePresence>
    )
}


export default SessionContainer;
