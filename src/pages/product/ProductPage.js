import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartConntext";
import { useData } from "../../context/DataContext";
import useAuth from "../../hooks/useAuth";
import "./ProducPage.css";
import "../../styles/cartCard.css"

const ProductPage = () => {
  const { productId } = useParams();

  const { productList, cartList } = useData();

  const { auth, setAuth } = useAuth();

  const jwtToken = auth.accessToken;

  const navigate = useNavigate();
  const location = useLocation();

  const product = productList.find((product) => {
    console.log("In " + product.prod_id);
    return product.prod_id == productId;
  });

  const [productQty, setProductQty] = useState(1);

  const { addToCart } = useCart();


  const setShowModal = () => {};

  // location provides information about the current URL location, including any state information that was passed in from a redirect
  console.log("location is " + JSON.stringify(location));

  const cartHandler = () => {
    jwtToken ? addToCart(productId, jwtToken, productQty) : navigate("/signin", { state: { from: location.pathname } });
  };

  console.log("Cart list in productpage " + cartList);

  return (
    <section className="flex-row-center items-start wrap mt-2p5 mb-4 product-section">
      <img src={product?.primaryImage} alt={product?.name} />
      <div className="product-form">
        <div className="product-header flex-row-center">
          <h5 className="text-uppercase">{product?.name}</h5>
          <span onClick={() => setShowModal()}>
            <i className="fas fa-share-alt fa-lg button-link"></i>
          </span>
        </div>
        {/* {showModal && (
          <ShareProductModal url={completeURL} setShowModal={setShowModal} />
        )} */}

        {/* <div className="pb-0p5">
          Rating:{" "}
          {RATING_STARS.map((star, index) => (
            <i
              key={index}
              className={`rating-icon rating-icon--star fa fa-star fw-500 ${
                product?.rating >= star ? "fw-900" : ""
              }`}
            ></i>
          ))}
        </div> */}

        <div className="flex-row">
          <span className="discounted-price text-md">
            {product?.discount_percent} VND
          </span>
          <span className="original-price pl-0p5">
            {product?.original_price} VND
          </span>
        </div>

        <p className="dark-gray-text text-capitalize border-top-1 pt-2 pb-1">
          Giá đã bao gồm thuế. Miễn phí vận chuyển cho đơn hàng trả trước
        </p>
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => {
              setProductQty(productQty - 1);
            }}
          >
            -
          </button>
          <span className="quantity-input">{productQty}</span>
          <button
            className="quantity-btn"
            onClick={() => {
              setProductQty(productQty + 1);
            }}
          >
            +
          </button>
        </div>
        <button
          type="submit"
          className="button primary radius-0 mt-2 cta-cart-btn"
          onClick={cartHandler}
        >
          {"Add to Cart"}
        </button>
        <button
          className="button inverted-primary radius-0 mt-1p5 cta-wishlist-btn"
          //   onClick={wishlistHandler}
        >
          {"Add to Wishlist"}
        </button>

        <div>
          <p className="mt-1">
            <i className="fas fa-rupee-sign"></i> Trả tiền khi nhận hàng
          </p>
          <p>
            <i className="fas fa-exchange-alt"></i> Hoàn trả dễ dàng trong 14
            ngày
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
