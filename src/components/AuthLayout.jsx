import { Outlet } from "react-router";
import Auth from "./Auth";

function AuthLayout() {
    return (
        <Auth>
            <Outlet />
        </Auth>
    );
}

export default AuthLayout;
