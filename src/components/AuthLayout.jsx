import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"
import Auth from "./Auth";

function AuthLayout() {
    return (
        <Auth>
            <Outlet />
        </Auth>
    );
}

export default AuthLayout;
