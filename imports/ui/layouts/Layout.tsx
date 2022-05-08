import React from "react";
import styles from "./Layout.module.css";
import classNames from "classnames";

import {Outlet, NavLink, useResolvedPath, useMatch} from "react-router-dom";

import Header from "/imports/ui/layouts/Header";
import Navigation from "/imports/ui/layouts/Navigation";


const Layout: React.FC = () => {
    const path = useMatch("sessions");
    console.log(path)
    
    return (<>
        <Header />
        <Outlet/>
        
        <Navigation />
        
    </>)
}

export default Layout;
