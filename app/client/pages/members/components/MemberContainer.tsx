import React from "react";
import { Children, ReactNode } from "react";

import { AnimatePresence } from "framer-motion";

import { Text, Card, List } from "../../../components";

interface MemberContainerProps {
    title: ReactNode;
    children: ReactNode;
}

export const MemberContainer: React.FC<MemberContainerProps> = ({
    title,
    children,
}) =>
    children ? (
        <>
            <Text.sub>{title}</Text.sub>
            <AnimatePresence initial={false}>
                {Children.count(children) > 0 && (
                    <Card>
                        <List>{children}</List>
                    </Card>
                )}
            </AnimatePresence>
        </>
    ) : null;
