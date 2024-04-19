import { useEffect, useState } from "react"
import Axios from "axios";
import "./animedetails.css"
export function Animecard({fulldata,id,fetchreq}){ 
    let [chardata,setchardata]=useState([])
    async function characterfetch(charid){
        const charresp = await Axios.get(`https://api.jikan.moe/v4/anime/${charid}/characters`)
        setchardata(Array(charresp.data.data))
    }
    useEffect(()=>{characterfetch(fulldata[id].mal_id)},[id])
    return(
        <div className="card" style={{backgroundColor:"inherite"}}>
                    <div className="details1">
                        <img id="largeimage" src={fulldata[id].images.jpg.large_image_url} alt="" />
                            <div className="animedetails">
                                <h1 >{fulldata[id].title_english}</h1>
                                <p>Episodes:{fulldata[id].episodes}</p>
                                <p>{fulldata[id].synopsis}</p>
                                <div className="anime_characters">
                                    <h2>Characters</h2>
                                    <div className="character">
                                        {chardata.length!=0 && chardata[0].map((val,key)=>{
                                                return(<div key={key}>
                                                    <img src={val.character.images.jpg.image_url} alt=""/>
                                                    <p>{val.character.name}</p>
                                                    </div>
                                                )
                                                    })
                                                }
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
    )
}