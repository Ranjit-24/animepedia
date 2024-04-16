import { BrowserRouter as Router , Routes,Route , Link} from 'react-router-dom'
import { Newarrival } from './components/newarriival'
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
  async function fetchreq(){
    const resp = await Axios.get(`https://api.jikan.moe/v4/top/anime?page=${pagenum}`)
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
        episodes:(value.episodes)
      }
      newarray=[...newarray,anime_obj]
    })
    setanimedata(newarray)
    
  }

  useEffect(()=>{fetchreq()},[pagenum])
  

  return (
    <appcontext.Provider value={{animedata,setnum,fullanimedata}}>
      <div className="App">
        <Router>
          <nav className="navbar">
          <Link to="/"><h1>Animepedia</h1></Link>
            <div className="linkdiv">
            <Link to="/newarrival">New Arrival</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/newarrival' element={<Newarrival/>}/>
          </Routes>
        </Router>
      </div>
    </appcontext.Provider>

  )
}

export default App
