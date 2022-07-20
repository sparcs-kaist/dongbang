import * as React from "react";
// import styles from "./AppLayout.module.css";

import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import Navigation from "./Navigation";

const AppLayout: React.FC = () => <>
    <Header/>
    <main style={{
        padding: "var(--header-height) var(--page-margin) var(--nav-height)",
        minHeight: "100%",
    }}>
        <Outlet/>
    </main>
    <Navigation/>
</>;

export default AppLayout;
