import { useNavigate } from "react-router-dom";
import "../../styles/card.css";

const ProductCard = ({productDetails}) => {

    const {
        prod_id,
        prodName,
        primaryImage,
        original_price,
        discount,

    } = productDetails;


    const navigate = useNavigate();

    const cartHandler = () => {
      
    }



    return (
        <div className="card-vertical m-1" key={prod_id}>
          <div className="badge">
            <img
              loading="lazy"
              className="card-img-vertical img-responsive"
              src={primaryImage}
              alt={prodName}
            
            />
    
          </div>
          <div
            className="card-details text-center"
            onClick={() => navigate(`/product/${prod_id}`)}
          >
            <div className="title flex-column-center">
              <span>{prodName}</span>
            </div>
            <div className="card-footer-vertical">
              <span className="discounted-price">Rs. {discount}</span>
              <span className="original-price pl-0p5">Rs. {original_price}</span>
            </div>
          </div>
          <button
            className="plain-button card-button mt-0p5"
            onClick={() => cartHandler()}
          >
            {"Add to Cart"}
          </button>
        </div>
      );


}

export default ProductCard;