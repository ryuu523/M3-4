import "../styles/block.css"
import wall from "../images/28.jpeg"
import player from "../images/26.png"
import block from "../images/17.jpeg"
import flag from "../images/file.png"
function Block({ data }) {
    const getImagePath=()=>{
        switch (data) {
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
            <div className="back block" ></div>
            {data != 0 ? <img src={getImagePath()} className="block" /> : <></>}

        </div>
    );
}

export default Block;
