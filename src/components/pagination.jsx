import "./pagination.css"
import { useContext } from "react"
import { appcontext } from "../App"
export function Pagination(){
    const {setnum} = useContext(appcontext);
    return (
        <div className="pagination">
            <button id="prev" onClick={()=>setnum((prev)=>--prev)}>Prev</button>
            <button id="next" onClick={()=>setnum((prev)=>++prev)}>Next</button>
        </div>
    )
}