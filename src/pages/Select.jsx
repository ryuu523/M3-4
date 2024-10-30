import { useEffect, useState } from "react";
import { getProfile, getResults, logout } from "../api/api";
import { useLocation, useNavigate } from "react-router";

function Select() {
    const navigate = useNavigate()
   
    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")
    const [totalTime, setTotalTime] = useState(0)
    const handleGetProfile = async () => {
        try {
            const profile = await getProfile()

            setUsername(profile.profile.username)
            setNickname(profile.profile.nickname)
        } catch (e) {
            console.log(e.message);

        }
    }
    const handleGetResults = async () => {
        try {
            const results = await getResults()
            results.map((result) => {
                for (const key in result) {
                    if (key != "user") return

                    if (username == result[key]) {
                        setTotalTime(prev => prev + result["time"])
                    }
                }
            })
        } catch (e) {
            console.log(e.message);

        }
    }
    const profileSettings = () => {
        navigate("/profile")
    }
    const GamemodeSelect = (difficulty) => {
        navigate("/game", { state: { difficulty: difficulty } })
    }
    const handleLogout = async () => {
        try {
            const res = await logout()
            navigate("/")
        } catch (e) {
            console.log(e.message);

        }
    }
    const formatTime = (time) => {
        const min = Math.ceil(time / 60)
        return min
    }
    useEffect(() => {
        handleGetProfile()

    }, [])
    useEffect(() => {
        handleGetResults()
    }, [username])
    return (
        <>
            <p>welcome {nickname}!</p>
            <p>your total play time is {formatTime(totalTime)} min</p>
            <button onClick={() => profileSettings()}>profilesettings</button>
            <button onClick={() => handleLogout()}>logout</button>
            <button onClick={() => GamemodeSelect("easy")}>easy</button>
            <button onClick={() => GamemodeSelect("normal")}>normal</button>
        </>
    );
}

export default Select;
