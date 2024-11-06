import { Navigate } from "react-router-dom"

function Auth({ children }) {
    const token=sessionStorage.getItem("token")
    if(!token){
        return <Navigate to="/" replace/>
    }
    return children
}

export default Auth;
