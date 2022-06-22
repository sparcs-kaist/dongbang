import React, {Children, ReactNode} from "react";

import {AnimatePresence} from "framer-motion";

import {Text} from "/imports/ui/components/Text";
import {Card} from "/imports/ui/components/Card";

interface MemberContainerProps {
    title: ReactNode;
    children: ReactNode;
}

const MemberContainer: React.FC<MemberContainerProps> = (
    {title, children}
) => (
    children ? <>
        <Text.sub>{title}</Text.sub>
        <AnimatePresence initial={false}>
            {Children.count(children) > 0 && <Card>
                <AnimatePresence initial={false}>
                    {children}
                </AnimatePresence>
            </Card>}
        </AnimatePresence>
    </> : null
);

export default MemberContainer;
