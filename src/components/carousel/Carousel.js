import { useState } from "react";
import "../../styles/slider.css";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  console.log("Data carousel " + images);


  const prevSlide = () => {
    console.log("Current is " + currentImage);
    setCurrentImage(currentImage === 0 ? images.length-1 : currentImage-1);
    console.log("Ater Current is " + currentImage);

  }
  
  const nextSlide = () => {
    console.log("Current is " + currentImage);
    setCurrentImage(currentImage === images.length -1 ? 0 : currentImage + 1);
  }

  return (
    <div className="carousel-container">
      <div className="container">
        <img className="carousel-img" src={images[currentImage].src} />
      </div>
      <div className="left" onClick={prevSlide}>
        <i className="fas fa-angle-left text-xl" aria-hidden="true"></i>
      </div>
      <div className="right" onClick={nextSlide}>
        <i className="fas fa-angle-right text-xl" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default Carousel;
