import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import style from "./Home.module.css";

function Home() {
  return (
    <div className={style.background}>
    <ImageCarousel></ImageCarousel>
    </div>
  );
}

export default Home;
