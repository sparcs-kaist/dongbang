import React, {ReactNode} from "react";
import styles from "./MemberContainer.module.css";

import {Card} from "/imports/ui/components/Card";

interface MemberContainerProps {
    children: ReactNode;
}

const MemberContainer: React.FC<MemberContainerProps> = (
    {children}
) => (
    <Card className={styles.container}>
        {children}
    </Card>
);

export default MemberContainer;
