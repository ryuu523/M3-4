import block from "../images/block.jpeg"
import flag from "../images/flag.png"
import player from "../images/player.png"
import wall from "../images/block.jpeg"
import "../styles/block.css"
function Block(type) {
    const createImageSrc=()=>{
        switch (type) {
            case 1:
                return wall
            case 2:
                return player
            case 3:
                return block
            case 4:
                return flag
        }
    }
    return (
        <div className="relative">
            <div className="back block"></div>
            {type != 0 ? <img className="block" src={createImageSrc()} /> : <></>}
        </div>
    )
}

export default Block;