import Complementos from "./Complementos";
import styles from "./Home.module.css"

function Home () {

return (
        <div>
  <div className={styles.home}>
        <hr color="#FFFFFF"/>
        <h1>E vamos de açaí!</h1>
        </div>
        <div>
        <Complementos/>
        </div>

        </div>
)

}

export default Home;
