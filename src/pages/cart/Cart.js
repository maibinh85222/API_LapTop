import { Link } from "react-router-dom";
import { useCart } from "../../context/CartConntext";
import "./cart.css";
import emptycart from "../../assets/emptycart.jpg"

import { CartCard } from "./CartCard";
import CartSummary from "./CartSummary";

const Cart = () => {
  const { cartList, cartDispatch } = useCart();

  console.log("Cart list " + JSON.stringify(cartList));

  const isCartEmpty = cartList.length < 1;

  return (
    <main>
      {isCartEmpty ? (
        <div className="flex-row-center image-container">
          <div className="empty-page-text">
            <h5>Oops! Your cart looks empty! 😓</h5>
            <h6>
              Add products to your cart from{" "}
              <Link
                to="/products"
                className="secondary-text primary-bg py-0 p-0p5"
              >
                HERE
              </Link>
            </h6>
          </div>
          <img
            className="empty-page-image"
            src={emptycart}
            loading="lazy"
            alt="empty cart"
          />
        </div>
      ) : (
        <>
          <h4 className="text-center text-uppercase p-1">My Cart</h4>
          <div className="table-container m-auto">
            <div className="cart-header">
              <span className="cart-header-item pb-1">Product</span>
              <span className="cart-header-item pb-1 text-center">
                Quantity
              </span>
              <span className="cart-header-item pb-1 text-right">SubTotal</span>
            </div>
            {cartList.map((product) => (
              <CartCard
                key={product.product.id}
                productDetails={product}
                dispatch={cartDispatch}
              />
            ))}
          </div>
        </>
      )}

      {/* {isCartEmpty == null? "" : <CartSummary />} */}
      {!isCartEmpty && <CartSummary />}
    </main>
  );
};

export { Cart };
