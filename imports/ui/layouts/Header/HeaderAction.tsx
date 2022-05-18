import React, {ReactNode} from "react";
import {useLocation, useMatch, useResolvedPath} from "react-router-dom";


interface HeaderActionProps {
    path: string;
    children: ReactNode;
}

const HeaderAction: React.FC<HeaderActionProps> = ({path, children}) => {
    const location = useLocation();
    const resolvedPath = useResolvedPath(path);
    
    const locationPathname = location.pathname.toLowerCase();
    const toPathname = resolvedPath?.pathname.toLowerCase();
    
    let isActive = locationPathname === toPathname
        || locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
    
    return (isActive ? <>{children}</> : null)
}

export default HeaderAction;
