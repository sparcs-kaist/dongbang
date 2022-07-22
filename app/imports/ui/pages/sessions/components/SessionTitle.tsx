import React from "react";
import { motion } from "framer-motion";

import { Text } from "../../../components";

interface SessionContainerProps {
    title: string;
    numSessions: number;
}

const SessionTitle: React.FC<SessionContainerProps> = (
    { title, numSessions },
) => {
    return (
        numSessions > 0 ? <motion.div
            layout
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Text.sub>{title}</Text.sub>
        </motion.div> : null
    
    );
};

export default SessionTitle;
