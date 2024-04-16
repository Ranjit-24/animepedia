import { useContext, useEffect, useState } from "react"
import { appcontext } from "../App"
import { Pagination } from "./pagination"
import { Animecard } from "./animecard"
import "./home.css"
export function Home(){
    const {animedata,fullanimedata}=useContext(appcontext)
    let [showid,setshowid]=useState(false)
    return (
        <>
        <main>
        {
            animedata.map((val)=>{
                return (
                <div key={(val.id)} className="animecard" onClick={()=>setshowid(val.id)}>
                <img src={val.image} alt="image" />
                <p >{val.title}</p>
                </div>
                )
            })
        }
        </main>
        <Pagination/>
        {showid && <Animecard fulldata={fullanimedata} id={--showid}/>}
        
        </>
    )
};