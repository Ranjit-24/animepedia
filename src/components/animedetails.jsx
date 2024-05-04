import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { appcontext } from "../App";
import Axios from "axios";
import "./animedetails.css"
export function Animecard(){
    let [chardata,setchardata]=useState([])
    let {fullanimedata,showid,category}=useContext(appcontext)
    showid--;
    async function characterfetch(charid){
        const charresp = await Axios.get(`https://api.jikan.moe/v4/${category}/${charid}/characters`)
        setchardata(Array(charresp.data.data))
    }
    function Character_det(){
        return (
            <div className="anime_characters">
                <h2>Characters</h2>
                <div className="character">
                    {chardata.length!=0 && chardata[0].map((val,key)=>{
                        return(<div key={key}>
                            <img src={val.character.images.jpg.image_url}/>
                            <p>{val.character.name}</p>
                            </div>
                        )
                            })
                        }
                </div>
            </div>)
    }
    useEffect(()=>{characterfetch(fullanimedata[showid].mal_id)},[showid])
    return (
        <div className="card" style={{backgroundColor:"inherite"}}>
                    <img id="largeimage" src={fullanimedata[showid].images.jpg.large_image_url} alt="" />
                    <div className="animedetails">
                        <div id="animedetails_header" style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                        <h1 >{fullanimedata[showid].title}</h1>
                        <button onClick={()=>localStorage.setItem("animename",fullanimedata[showid].title)}><Link id="animewatch-but" to="/animewatch">Watch</Link></button>
                        </div>
                        {category==="anime" ? <p>Episodes:{fullanimedata[showid].episodes}</p>:<p>Chapters:{fullanimedata[showid].chapters}</p>}
                        <p>{fullanimedata[showid].synopsis}</p>
                        <Character_det/>
                    </div>
        </div>
    )}