import React, {ReactNode} from "react";

import {AnimatePresence, motion} from "framer-motion";

import {Text} from "/imports/ui/components/Text";
import {Card} from "/imports/ui/components/Card";

interface MemberContainerProps {
    title: ReactNode;
    children: ReactNode;
}

const MemberContainer: React.FC<MemberContainerProps> = (
    {title, children}
) => (
    children ? <motion.div>
        <Text.sub>{title}</Text.sub>
        <Card>
            <AnimatePresence initial={false}>
                {children}
            </AnimatePresence>
        </Card>
    </motion.div> : null
);

export default MemberContainer;
