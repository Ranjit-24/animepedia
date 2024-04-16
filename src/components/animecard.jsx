
export function Animecard({fulldata,id}){
    
    return (
        <div className="card" style={{backgroundColor:"white"}}>
            <img src={fulldata[id].images.jpg.large_image_url} alt="" />
        </div>
    )
}