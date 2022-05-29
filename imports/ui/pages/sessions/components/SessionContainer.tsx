import React, {ReactNode} from "react";

import {Text} from "/imports/ui/components/Text";

interface SessionContainerProps {
    title: ReactNode;
    children: ReactNode[];
}

const SessionContainer: React.FC<SessionContainerProps> = (
    {title, children}
) => (
    (children.length) ? <div>
        <Text.sub>{title}</Text.sub>
        <div>{children}</div>
    </div> : null
)


export default SessionContainer;
