import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import logo from '../img/logoicecream.png'

 
 function Navbar () {

return (
  
<nav className={styles.navbar}>
                   <Link to="/"> 
                  <img src={logo} alt="icecream" className={styles.img}/> </Link>
                  
         <ul className={styles.list}>
            
         <li className={styles.item}><Link to="bit.ly/47DCIYo">Contato</Link>
        </li>
       
         </ul>
       
       </nav>
  
)

 }


export default Navbar;
