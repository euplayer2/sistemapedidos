import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Complementos from './components/pages/Complementos'

function App() {

  return (
    <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/complementos">Complementos</Link>
    </div>
    
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/complementos" element={<Complementos/>}/>
    </Routes>
    
        </Router>
  )
}

export default App
