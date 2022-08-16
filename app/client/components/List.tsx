import React from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";

export const List: React.FC = ({ children, ...props }) => (
    <div style={{ display: "flex", flexDirection: "column" }} {...props}>
        <LayoutGroup>
            <AnimatePresence initial={false}>{children}</AnimatePresence>
        </LayoutGroup>
    </div>
);
