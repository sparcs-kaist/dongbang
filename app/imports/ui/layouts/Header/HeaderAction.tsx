import * as React from "react";
import {ReactNode} from "react";
import styles from "./styles.module.css";
import {useLocation, useResolvedPath, Link} from "react-router-dom";


interface HeaderActionProps {
    path: string;
    to: string;
    icon: ReactNode;
}

const HeaderAction: React.FC<HeaderActionProps> = ({path, to, icon}) => {
    const location = useLocation();
    const resolvedPath = useResolvedPath(path);
    
    const locationPathname = location.pathname.toLowerCase();
    const toPathname = resolvedPath?.pathname.toLowerCase();
    
    let isActive = locationPathname === toPathname
        || locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
    
    return (isActive
        ? <Link to={to} className={styles.action}>{icon}</Link>
        : null)
}

export default HeaderAction;
