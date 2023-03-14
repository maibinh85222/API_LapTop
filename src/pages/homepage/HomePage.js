import Products from "../product/Products";
import "../product/Pagination.css";
import { useData } from "../../context/DataContext";
import "../../styles/product.css";
import "../../styles/border-util.css";
import "../../styles/image.css";
import CarouselData from "../../data/carousel-data";
import Carousel from "../../components/carousel/Carousel";
import NavigationBar from "../../navigation/NavigationBar";
const HomePage = () => {
  const value = useData();

  const images = CarouselData;
  console.log("Image are " + JSON.stringify(images));

  return (
    <>
      <Carousel images={images} />
      <Products />
    </>
  );
};

export default HomePage;
