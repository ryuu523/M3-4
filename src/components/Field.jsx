import Block from "./Block";
import "../styles/field.css"
function Field({ field }) {
    return (
        <>
            {field.map((row, y) => {
                return (
                    <div className="flex" key={"row:" + y}>
                        {row.map((type, x) => {
                            return <Block type={type} key={"block:" + x + ":" + y} />
                        })
                        }
                    </div>)
            })}
        </>

    )
}

export default Field;