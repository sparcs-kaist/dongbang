import React, {ReactNode} from "react";
import styles from "./MemberContainer.module.css";

import {motion} from "framer-motion";

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
        <Card className={styles.card}>
            {children}
        </Card>
    </motion.div> : null
);

export default MemberContainer;
