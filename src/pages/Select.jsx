import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getProfile, getResults, logout } from "../api/api";

function Select() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const [totalTime, setTotalTime] = useState(0)
  const getProfileData = async () => {
    try {
      const res = await getProfile()
      setNickname(res.profile.nickname)
      setUsername(res.profile.username)

    } catch (error) {
      console.log(error);

    }
  }
  const getResultsData = async () => {
    try {

      const results = await getResults()
      let total = 0
      results.forEach(result => {
        if (result.user === username) {
          total += result.time
        }
      });
      setTotalTime(total)
    } catch (error) {
      console.log(error);

    }

  }
  const handleProfile = () => {
    navigate("/profile")
  }
  const handleLogout = async () => {
    try {
      const res = await logout()
      sessionStorage.removeItem("token")
      navigate("/")

    } catch (error) {
      console.log(error);

    }

  }
  const handleGame = (difficulty) => {
    sessionStorage.setItem("difficulty", difficulty)
    navigate("/game")
  }
  const formatTotalTime = (time) => {
    const min = Math.floor(time / 60)
    return min
  }
  useEffect(() => {
    getProfileData()
  }, [])
  useEffect(() => {
    getResultsData()
  }, [username])

  return (
    <>
      <h1>welcome {nickname} !</h1>
      <h2>totaltime: {formatTotalTime(totalTime)} min</h2>
      <button onClick={() => handleProfile()}>profilesettings</button>
      <button onClick={() => handleLogout()}>logout</button>
      <button onClick={() => handleGame("easy")}>easy</button>
      <button onClick={() => handleGame("normal")}>normal</button>
    </>
  );
}

export default Select;
