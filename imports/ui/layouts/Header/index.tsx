import React from "react";

import {Link} from "react-router-dom";
import HeaderAction from "/imports/ui/layouts/Header/HeaderAction";

const Header: React.FC = () => {
    
    
    return (
        <header>
            Header
            <div>
                <HeaderAction path="/">
                    <Link to="login">login</Link>
                </HeaderAction>
                <HeaderAction path="sessions">
                    create
                </HeaderAction>
            </div>
        </header>
    )
}

export default Header;
