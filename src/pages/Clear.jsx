import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getProfile, getResults } from "../api/api";
import { formatTime } from "../components/formatTime";
import "../styles/clear.css"

function Clear() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [runking, setRunking] = useState([])
  const replay = () => {
    navigate("/select")
  }
  const getResultsData = async () => {
    try {
      const results = await getResults()
      const formatResult = results.sort((a, b) => a.time - b.time)
      const runkings = []
      let runk = 0
      let oldTime = -1
      for (const result of formatResult) {
        if (oldTime !== result.time) {
          runk++
        }
        oldTime = result.time
        if(runk>3){
        }
        else{
          runkings.push({ runk: runk, user: result.user, time: result.time })
        }

      }
      setRunking(runkings)
    } catch (error) {
      console.log(error);

    }
  }
  const getProfileData = async () => {
    try {

      const res = await getProfile()
      setUsername(res.profile.username)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getResultsData()
  }, [username])
  useEffect(() => {
    getProfileData()
  }, [])
  return (
    <>
      <h1>runking</h1>
      {
        runking.length != 0 ? runking.map((user) => {
          if (user.user == username) {
            return <h2 className="light">{user.runk}. {user.user} {formatTime(user.time)}</h2>

          }
          else {

            return <h2>{user.runk}. {user.user} {formatTime(user.time)}</h2>
          }
        }) : <></>
      }
      <button onClick={() => replay()}>replay</button>
    </>
  );
}

export default Clear;
