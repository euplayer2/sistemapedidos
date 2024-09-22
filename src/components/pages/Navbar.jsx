import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import logo from '../img/logoicecream.png'

 
 function Navbar () {

return (
  
<nav className={styles.navbar}>
                   <Link to="/"> 
                  <img src={logo} alt="icecream" className={styles.img}/> </Link>
                  
         <ul className={styles.list}>
            
         <li className={styles.item}><a href="https://bit.ly/3Zznhhz" target="_blank" rel="noopener noreferrer">Contato</a>

        </li>
       
         </ul>
       
       </nav>
  
)

 }


export default Navbar;
