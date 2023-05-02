import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
