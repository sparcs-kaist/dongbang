import React, {ReactNode} from "react";
import {useLocation, useMatch, useResolvedPath} from "react-router-dom";


interface HeaderActionProps {
    path: string;
    children: ReactNode;
}

const HeaderAction: React.FC<HeaderActionProps> = ({path, children}) => {
    const location = useLocation();
    const resolvedPath = useMatch(path);
    
    const locationPathname = location.pathname.toLowerCase();
    const toPathname = resolvedPath?.pathname.toLowerCase();
    
    let isActive = locationPathname === toPathname;
    
    return (isActive ? <>{children}</> : null)
}

export default HeaderAction;
