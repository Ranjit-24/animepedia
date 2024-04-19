import { BrowserRouter as Router , Routes,Route,Redirect , Link} from 'react-router-dom'
import { Manga } from './components/manga'
import { Animecard } from './components/animedetails'
import { Home } from './components/home'
import { createContext, useEffect } from 'react'
import  Axios  from 'axios'
import { useState } from 'react'
import './App.css'

export const appcontext=createContext()
function App() {
  let [fullanimedata,setfulldata]=useState([])
  const [animedata,setanimedata]=useState([])
  let [pagenum,setnum]=useState(1)
  let [showid,setshowid]=useState(false)
  const [category,setcategory]=useState("anime")
  async function fetchreq(){
    const resp = await Axios.get(`https://api.jikan.moe/v4/top/${category}?page=${pagenum}`)
    adddata(resp.data.data)
    setfulldata(resp.data.data)
  }
  function adddata(data){
    let anime_obj={}
    let newarray=[]
    data.map((value,key)=>{
      key++
      anime_obj ={
        id:key,
        title:(value.title),
        title_jap:(value.title_japanese),
        image:(value.images.jpg.image_url),
      }
      newarray=[...newarray,anime_obj]
    })
    setanimedata(newarray)
  }
  function changepage(cat){
    setnum(1)
    setcategory(cat)
  }
  useEffect(()=>{fetchreq()},[pagenum,category])
  return (
    <appcontext.Provider value={{animedata,pagenum,setnum,setshowid}}>
      <div className="App">
        <Router>
          <nav className="navbar">
            <Link to="/" onClick={()=>changepage("anime")}><h1>Animepedia</h1></Link>
            <div className="linkdiv">
            <Link to="/manga" onClick={()=>changepage("manga")}>Manga</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/manga' element={<Manga/>}/>
            <Route path="/animedetails" element={<Animecard  fulldata={fullanimedata} id={--showid} fetchreq={fetchreq}/>} />
            <Redirect path="/"/>
          </Routes>
        </Router>
      </div>
    </appcontext.Provider>

  )
}

export default App
