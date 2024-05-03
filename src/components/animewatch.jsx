import { useState,useContext, useEffect } from "react"
import { appcontext } from "../App";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './animewatch.css'
async function fetch_data(ani_search,setwatchload,setseason_id){
    let animeid
    //fetching animeid
    const fetch_data= await fetch( `https://aniwatch-api-v1-0.onrender.com/api/search/${ani_search}`)
    let data = await  fetch_data.json()
    animeid =data.searchYour[0].idanime
    console.log("stage1 fetching completed")
    //fetching anime season id
    const fetch_anime_season_id= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/related/${animeid}`)
    data= await fetch_anime_season_id.json()
    data.infoX[3]=== undefined ? animeid=animeid:animeid=data.infoX[3].season[0].id
    // here the last number is seprated from animeid
    animeid=animeid.split("-")
    console.log(animeid)  
    animeid=animeid[animeid.length-1]
    
    console.log("stage2 fetching completed")
    //fetching episode id
    const fetch_anime_episode_id= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/episode/${animeid}`)
    data= await fetch_anime_episode_id.json()
    let epid =data.episodetown[0].epId
    epid=epid.split("ep=")[1]

    console.log("stage3 fetching completed")
    //fetching server
    const fetch_server_id= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/server/${epid}`)
    data= await fetch_server_id.json()
    let srcId=data.sub[0].srcId
    console.log("stage4 fetching completed")
    //fetching url
    const fetch_url= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/src-server/${srcId}`)
    data= await fetch_url.json()
    setseason_id(data.restres.sources[0].url);
    console.log("stage5 fetching completed")
    console.log(data)
    setwatchload(false)
}
export function Animewatch(){
    let [watchdataloading,setwatchload]=useState(true)
    let {fullanimedata,showid,loading}=useContext(appcontext)
    --showid
    let [anime_season_id,setseason_id]=useState();
    useEffect(()=>{!loading && fetch_data(fullanimedata[showid].title,setwatchload,setseason_id)},[])
    //reload issue solution 
    return <div id="aniwatch-div">{watchdataloading ? <h1>Loading.....</h1>:
    <>
    <video ref={videojs} id="my-video"
            width="800px"
            height="300px"
            className="video-js"
            controls
            poster="MY_VIDEO_POSTER.jpg"
            data-setup="{}">
        <source src={`${anime_season_id}`} type="application/x-mpegURL"/>
    </video>
    </>}</div>
}