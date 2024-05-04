import { useState,useContext, useEffect,useRef} from "react"
import { appcontext } from "../../App";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoJS from "./videojs";
import './animewatch.css'

async function stage1_fetch(ani_search){
    const fetch_data= await fetch( `https://aniwatch-api-v1-0.onrender.com/api/search/${ani_search}`)
    let data = await  fetch_data.json()
    return data.searchYour[0].idanime
}
async function stage2_fetch(animeid){
    const fetch_video_url= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/related/${animeid}`)
    let data= await fetch_video_url.json()
    data.infoX[3]=== undefined ? animeid=animeid:animeid=data.infoX[3].season[0].id
    // here the last number is seprated from animeid
    animeid=animeid.split("-")
    return animeid[animeid.length-1]
}
async function stage3_fetch(animeid,epnum){
    const fetch_anime_episode_id= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/episode/${animeid}`)
    let data= await fetch_anime_episode_id.json()
    let epid =data.episodetown[epnum].epId
    epid=epid.split("ep=")[1]
    const fetch_server_id= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/server/${epid}`)
    data= await fetch_server_id.json()
    let srcId= data.sub[0].srcId
    const fetch_url= await fetch(`https://aniwatch-api-v1-0.onrender.com/api/src-server/${srcId}`)
    data= await fetch_url.json()
    return data.restres.sources[0].url
}
async function fetch_data(ani_search,setwatchload,setvideourl,setloadstatus,animeid,setanimeid){
    //fetching animeid
    animeid =await stage1_fetch(ani_search)
    setloadstatus("stage1 fetching completed")
    //fetching anime season id
    animeid =await stage2_fetch(animeid)
    setloadstatus("Almost there")
    //fetching episode id
    //fetching server//fetching url
    setvideourl(await stage3_fetch(animeid,0));
    setloadstatus("stage5 fetching completed")
    setanimeid(animeid)
    setwatchload(false)
}
export function Animewatch(){
    let [animeid,setanimeid]=useState()
    let [watchdataloading,setwatchload]=useState(true)
    let {fullanimedata,showid,loading}=useContext(appcontext)
    let [video_url,setvideourl]=useState();
    let [loadingstatus,setloadstatus]=useState("wait for a min");
    let ani_search = localStorage.getItem("animename")
    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: true,
        controls:true,
        sources: [{
            src: `${video_url}`,
            type: "application/x-mpegURL"
      }]
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
      };
    
    useEffect(()=>{fetch_data(ani_search,setwatchload,setvideourl,setloadstatus,animeid,setanimeid)},[])
    --showid
    return <div id="aniwatch-div">{watchdataloading ? 
    <>
    <h1>Loading.....</h1>
    <p>{loadingstatus}</p>
    </>
    :
    <>
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>}</div>
    
}
