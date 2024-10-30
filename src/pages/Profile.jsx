import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/api";
import { useNavigate } from "react-router";

function Profile() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")
    const [validateOK, setvalidateOK] = useState(true)
    const handleGetProfile = async () => {
        try {
            const profile = await getProfile()

            setUsername(profile.profile.username)
            setNickname(profile.profile.nickname)
        } catch (e) {
            console.log(e.message);
        }
    }
    const handleUpdateProfile = async () => {
        try {
            const res = await updateProfile(username,nickname)
            navigate("/select")
        }
        catch (e) {
            alert("The username is already token.")
        }
    }

    useEffect(() => {
        handleGetProfile()
    }, [])
    useEffect(() => {
        const regUser = new RegExp("^[a-zA-z0-9]{5,}$")
        const regNick = new RegExp("^.{4,}$")
        console.log(username,nickname);
        
        if (regUser.test(username) && regNick.test(nickname)) {
            setvalidateOK(false)
        }
        else {
            setvalidateOK(true)
        }
    }, [username, nickname])
    return (
        <>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button disabled={validateOK} onClick={() => handleUpdateProfile()}>更新</button>
        </>
    );
}

export default Profile;
