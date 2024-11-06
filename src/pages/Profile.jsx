import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "../api/api";

function Profile() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [nickname, setNickname] = useState("")
  const [validateFlag, setValidateFlag] = useState(true)

  const handleUpdateProfile = async () => {
    try {

      const res = await updateProfile(username, nickname)
      navigate("/select")
    } catch (error) {
      console.log(error);

    }
  }
  const getProfileData = async () => {
    try {

      const res = await getProfile()
      setNickname(res.profile.nickname)
      setUsername(res.profile.username)
    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    getProfileData()
  }, [])
  useEffect(() => {
    const reg = /^[a-zA-Z0-9]+$/
    if (reg.test(username) && username.length >= 5 && nickname.length >= 4) {
      console.log("aa");
      setValidateFlag(false)
    }
    else{
      setValidateFlag(true)
    }
  }, [username, nickname])

  return (
    <>
      username:<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      nickname:<input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <button disabled={validateFlag} onClick={() => handleUpdateProfile()}>update</button>
    </>
  );
}

export default Profile;
