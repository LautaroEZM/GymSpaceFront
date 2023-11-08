import { Link } from "react-router-dom";
import style from "./Home.module.css";

function Home() {
  return (
    <div className={style.background}>
      <Link to="/list" className={style.homeButton}>
        <span>Join Page</span>
      </Link>
    </div>
  );
}

export default Home;
