import { BrowserRouter as Router , Routes,Route , Link,Navigate} from 'react-router-dom'
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
  const [showid,setshowid]=useState(false)
  const [category,setcategory]=useState("anime")
  let [loading,isloading]=useState(true)
  async function fetchreq(){
    try{
      const resp = await Axios.get(`https://api.jikan.moe/v4/top/${category}?page=${pagenum}`)
      adddata(resp.data.data)
      setfulldata(resp.data.data)
    }
    catch(e){
      console.log('fetch',e)
    }
    finally{
      isloading(false)
    }
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
    <appcontext.Provider value={{animedata,pagenum,setnum,setshowid,fullanimedata,showid,loading,category}}>
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
            <Route path="/animedetails" element={loading?<Navigate to="/" replace/>:<Animecard/>} />
          </Routes>
        </Router>
      </div>
    </appcontext.Provider>

  )
}

export default App
