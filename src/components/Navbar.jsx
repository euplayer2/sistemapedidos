import { Link } from "react-router-dom"
 
 <nav className={styles.navbar}>
 
            <Link to="/"> 
           <img src={logo} alt="costs" /> </Link>
           
    
  <ul className={styles.list}>

  <li className={styles.item}>
 <Link to="/project">Projetos</Link>
 </li>
 <li className={styles.item}>
 <Link to="/company">Empresa</Link>
 </li>
 <li className={styles.item}>
 <Link to="/newproject">Novo Projeto</Link>
 </li>
 <li className={styles.item}><Link to="/contato">Contato</Link>
 </li>

  </ul>

</nav>