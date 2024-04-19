import "./pagination.css"
import { useContext } from "react"
import { appcontext } from "../App"
export function Pagination(){
    const {setnum,pagenum} = useContext(appcontext);
    let pagenumbering=pagenum
    return (
        <div className="pagination">
            {pagenumbering>1 ? <button id="prev" onClick={()=>setnum((prev)=>{
                return --prev})}>Prev</button>:<br/>}
            <div className="pagenumbering">
                {--pagenumbering!==0 &&<div id="prev_page_num"><p>{pagenumbering}</p></div>}
                <div id="pret_page_num"><p>{++pagenumbering}</p></div>
                <div id="next_page_num"><p>{++pagenumbering}</p></div>
            </div>
            <button id="next" onClick={()=>setnum((prev)=>++prev)}>Next</button>
        </div>
    )
}