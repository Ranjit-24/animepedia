import { useContext, useEffect, useState } from "react"
import { appcontext } from "../App"
import { Pagination } from "./pagination"
import { Link } from "react-router-dom"
import "./home.css"
export function Manga(){
    const {animedata,setshowid}=useContext(appcontext)
    return (
        <>
        <main>
        {
            animedata.map((val)=>{
                return (
                <Link to="/animedetails" key={(val.id)}>
                <div  className="animecard" onClick={()=>setshowid(val.id)}>
                <img src={val.image} alt="image" />
                <p >{val.title}</p>
                </div>
                </Link>
                
                )
            })
        }
        </main>
        <Pagination/>
        </>
    )
};