import React from "react";
import styles from "./AppLayout.module.css";

import {Outlet} from "react-router-dom";

import Header from "/imports/ui/layouts/Header";
import Navigation from "/imports/ui/layouts/Navigation";


const AppLayout: React.FC = () => <>
    <Header/>
    <main className={styles.content}>
        <Outlet/>
    </main>
    <Navigation/>
</>;

export default AppLayout;
