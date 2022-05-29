import React, {Children, ReactNode} from "react";
import {motion, AnimatePresence} from "framer-motion";


import {Text} from "/imports/ui/components/Text";

interface SessionContainerProps {
    title: string;
    numSessions: number;
}

const SessionTitle: React.FC<SessionContainerProps> = (
    {title, numSessions}
) => {
    return (
        numSessions > 0 ? <motion.div
            layout
            key={title}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Text.sub>{title}</Text.sub>
        </motion.div> : null
    
    )
}


export default SessionTitle;
