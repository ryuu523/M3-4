import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Field from "../components/Field";
import { formatTime } from "../components/formatTime";
import { getField, postResult } from "../api/api";

function Game() {
  const navigate = useNavigate()
  const [field, setField] = useState([])
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 })
  const [time, setTime] = useState(0)
  const [blockMove, setBlockMove] = useState(0)
  const [clearFlag, setClearFlag] = useState(false)
  const AIR = 0
  const WALL = 1
  const PLAYER = 2
  const BLOCK = 3
  const FLAG = 4
  const postResultData=async()=>{
    const res=await postResult(blockMove,time)
  }
  const getFieldData=async()=>{
    try {
      const data=await getField()
      const difficulty=sessionStorage.getItem("difficulty")
      if(difficulty=="normal"){
        setField(data.normal)
      }
      else{
        setField(data.easy)
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    const handleKeydown = (e) => {
      const vec = { x: 0, y: 0 }
      switch (e.key) {
        case "ArrowUp":
          vec.y = -1
          break;
        case "ArrowDown":
          vec.y = 1
          break;
        case "ArrowLeft":
          vec.x = -1
          break;
        case "ArrowRight":
          vec.x = 1
          break;
      }
      
      if (field[playerPos.y + vec.y][playerPos.x + vec.x] == WALL) return
      if (field[playerPos.y + vec.y][playerPos.x + vec.x] == BLOCK) {
        
        if (field[playerPos.y + vec.y * 2][playerPos.x + vec.x * 2] != 0) return
        setBlockMove((prev) => prev + 1)
        setField((prev) => {
          const clone = prev.map((row) => row.concat())
          clone[playerPos.y + vec.y][playerPos.x + vec.x] = AIR
          clone[playerPos.y + vec.y * 2][playerPos.x + vec.x * 2] = BLOCK
          return clone
        })
        return
      }

      if (field[playerPos.y + vec.y][playerPos.x + vec.x] == FLAG) {
        setClearFlag(true)
      }
      setField((prev) => {
        const clone = prev.map((row) => row.concat())
        clone[playerPos.y + vec.y][playerPos.x + vec.x] = AIR
        clone[playerPos.y + vec.y * 2][playerPos.x + vec.x * 2] = PLAYER
        return clone
      })
      setPlayerPos((prev) => ({ ...prev, x: prev.x + vec.x, y: prev.y + vec.y }))

    }
    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [field])
  useEffect(() => {
    if(clearFlag){
      postResultData()
      navigate("/clear")

    }

  }, [clearFlag])
  useEffect(() => {
    getFieldData()
    const intervel = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(intervel)
  }, [])
  return (
    <>
      <h1>time: {formatTime(time)}</h1>
      <Field field={field} />
    </>
  );
}

export default Game;
