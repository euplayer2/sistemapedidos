import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home'
import Complementos from './components/pages/Complementos'
import Navbar from './components/pages/Navbar'

function App() {

  return (
    <Router>
    
    <Navbar/>
    
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/complementos" element={<Complementos/>}/>
    </Routes>
    
        </Router>
  )
}

export default App