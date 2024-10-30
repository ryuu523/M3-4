import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router";

function Start() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const res = await login(name, password)
            console.log(res);
            sessionStorage.setItem("token",res.token)
            navigate("/select")
        }
        catch (e) {
            setName("")
            setPassword("")
            alert("The username or password is incorrect")
        }
    }
    return (
        <>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>ログイン</button>
        </>
    );
}

export default Start;
