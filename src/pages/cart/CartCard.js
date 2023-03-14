import { useCart } from "../../context/CartConntext";
import useAuth from "../../hooks/useAuth";

const CartCard = ({ productDetails, dispatch }) => {
  console.log("Product detail in cart card " + JSON.stringify(productDetails));

  const { id, name, primaryImage, original_price, discount_percent } =
    productDetails.product;

  const quantity = productDetails.quantity;

  console.log(
    "All value " +
      id +
      " " +
      name +
      " " +
      primaryImage +
      " " +
      original_price +
      " " +
      discount_percent +
      " " +
      quantity
  );

  const { auth, setAuth } = useAuth();
  const { updateCartItem } = useCart();
  const token = auth.accessToken;
  const cartQuantityHandler = async (type) => {
    await updateCartItem(id, token, type);
  };

  const deleteCartItem =  () => {
    // console.log("Da vao delete Cart item");
    //  removeCartItem(id, token);
  }

  return (
    <div className="cart-item">
      <div className="card-horizontal">
        <div className="card-info">
          <img className="card-img-horizontal" src={primaryImage} alt={name} />
          <div className="card-details">
            <div className="title">{name}</div>
            <div className="fw-700">
              {original_price - original_price * discount_percent} VND{" "}
              <span className="original-price fw-500">{original_price}</span> (
              {discount_percent * 100}% OFF)
            </div>

            <div>
              <button className="cart-button danger-text" onClick={() => deleteCartItem()}>Xoá</button> |{" "}
              <button className="cart-button secondary-text fw-700">
                Đến wishlist
              </button>
            </div>
          </div>
        </div>
        <div className="cart-actions_mobile mt-1">
          <div className="quantity-selector">
            <button className="quantity-btn">-</button>
            <span className="quantity-input">{quantity}</span>
            <button className="quantity-btn">+</button>
          </div>
          <div className="final-price fw-700">VND {discount_percent}</div>
        </div>
      </div>
      <div className="cart-actions cart_web">
        <div className="quantity-selector m-auto">
          <button
            className={
              quantity !== 1 ? "quantity-btn" : "quantity-btn disabled"
            }
            onClick={() => cartQuantityHandler("DECREASE")}
          >
            -
          </button>
          <span className="quantity-input">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => cartQuantityHandler("INCREASE")}
          >
            +
          </button>
        </div>
      </div>
      <div className="final-price cart_web text-right fw-700">
        {(
          (original_price - original_price * discount_percent) *
          quantity
        ).toFixed(2)}{" "}
        VND
      </div>
    </div>
  );
};

export { CartCard };
