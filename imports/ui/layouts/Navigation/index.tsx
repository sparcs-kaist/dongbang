import React from "react";

import NavAction from "./NavAction";

const Navigation: React.FC = () => {
    
    
    return (
        <nav>
            <NavAction to="/">
                members
            </NavAction>
            <NavAction to="sessions">
                sessions
            </NavAction>
        </nav>
    )
}

export default Navigation;
