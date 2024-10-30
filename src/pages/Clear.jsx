import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProfile, getResults, } from "../api/api";
import "../styles/clear.css"
import { formatTimeMS } from "../components/formatTime";
function Clear() {
  const [runking, setRunking] = useState([])
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const handleGetProfile = async () => {
    try {
      const profile = await getProfile()
      setUsername(profile.profile.username)
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleGetResults = async () => {
    try {
      const results = await getResults()
      const sortData = results.sort((a, b) => a.time - b.time)
      const runkingData = []
      let runk = 0
      let beforeTime = 0
      for (const item of sortData) {
        if (beforeTime !== item.time) {
          beforeTime = item.time
          runk++
        }
        if (runk > 3) {
          break
        }
        runkingData.push({ runk: runk, user: item.user, time: item.time })
      }
      console.log(runkingData);

      setRunking(runkingData)
    } catch (e) {
      console.log(e.message);

    }
  }
  const replay = () => {
    navigate("/select")
  }
  useEffect(() => {
    handleGetResults()
    handleGetProfile()
  }, [])
  return (
    <>
      {
        runking.map((data, i) => {
          return (
            <p key={"runk:" + i} className={data.user == username ? "light" : ""}>{data.runk}.  {data.user}  {formatTimeMS(data.time)}</p>

          )
        })
      }
      <button onClick={() => replay()}>リプレイ</button>
    </>
  );
}

export default Clear;
