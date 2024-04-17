import "./animedetails.css"
export function Animecard({fulldata,id}){
    console.log(fulldata)
    return (
        <div className="card" style={{backgroundColor:"inherite"}}>
            <img src={fulldata[id].images.jpg.large_image_url} alt="" />
            <div className="animedetails">
                <h1 >{fulldata[id].title_english}</h1>
                <p>Episodes:{fulldata[id].episodes}</p>
                <p>{fulldata[id].synopsis}</p>
            </div>
        </div>
        
    )
}