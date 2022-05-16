import React from "react";
import styles from "./AppLayout.module.css";
import classNames from "classnames";

import {Outlet, NavLink, useResolvedPath, useMatch} from "react-router-dom";

import Header from "/imports/ui/layouts/Header";
import Navigation from "/imports/ui/layouts/Navigation";


const AppLayout: React.FC = () => {
    const path = useMatch("sessions");
    console.log(path)
    
    return (<>
        <Header />
        <main className={styles.content}>
            <Outlet/>
        </main>
        <Navigation />
        
    </>)
}

export default AppLayout;
