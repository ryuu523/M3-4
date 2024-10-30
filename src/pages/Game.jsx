import { useEffect, useState } from "react";
import { getField, postResult } from "../api/api";
import Block from "../components/Block";
import "../styles/game.css"
import { formatTimeMS } from "../components/formatTime";
import { useLocation, useNavigate } from "react-router";
function Game() {
    const navigate = useNavigate()
    const location = useLocation()
    const { difficulty } = location.state
    const BLANK = 0
    const WALL = 1
    const PLAYER = 2
    const BLOCK = 3
    const FLAG = 4
    const [field, setField] = useState([])
    const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 })
    const [time, setTime] = useState(0)
    const [blockMove, setBlockMove] = useState(0)
    const [clear, setClear] = useState(false)
    const postData = async () => {
        const res = await postResult(blockMove, time)
    }
    const handleGetField = async () => {
        const fieldData = await getField()
        if (difficulty == "normal") {

            setField(fieldData.normal)
        }
        else {
            setField(fieldData.easy)

        }

    }
    useEffect(() => {

        const handleKeydown = (e) => {
            let vec = { x: 0, y: 0 }
            const clone = field.map((row) => row.concat())
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
            console.log("a");
            if (field[playerPos.y + vec.y][playerPos.x + vec.x] == WALL) return
            console.log("b");

            if (field[playerPos.y + vec.y][playerPos.x + vec.x] == BLOCK) {
                console.log("c");

                if (field[playerPos.y + vec.y * 2][playerPos.x + vec.x * 2] != BLANK) return
                console.log("d");

                clone[playerPos.y + vec.y][playerPos.x + vec.x] = BLANK
                clone[playerPos.y + vec.y * 2][playerPos.x + vec.x * 2] = BLOCK
                setBlockMove((prev) => prev + 1)
                setField(clone)
                return
            }

            clone.map((row, y) => row.map((data, x) => {
                if (data != 2) return
                clone[y][x] = BLANK
            }))
            console.log("e");
            if (field[playerPos.y + vec.y][playerPos.x + vec.x] == FLAG) {
                setClear(true)
            }
            clone[playerPos.y + vec.y][playerPos.x + vec.x] = PLAYER
            setPlayerPos((prev) => ({ ...prev, x: prev.x + vec.x, y: prev.y + vec.y }))
            setField(clone)
        }
        window.addEventListener("keydown", handleKeydown)
        return () => window.removeEventListener("keydown", handleKeydown)
    }, [field])
    useEffect(() => {

        if (!clear) return
        postData()
        navigate("/clear")
    }, [clear])

    useEffect(() => {
        handleGetField()
        const interval = setInterval(() => {
            setTime((prev) => prev + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <h1>{formatTimeMS(time)}</h1>
            {field.map((row, y) => {
                return (
                    <div key={"row:" + y} className="flex">{
                        row.map((data, x) => {
                            return <Block key={"block" + y + ":" + x} data={data} />
                        })}
                    </div>
                )

            })}
        </>
    );
}

export default Game;
