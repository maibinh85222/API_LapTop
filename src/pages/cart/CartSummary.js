import { useCart } from "../../context/CartConntext";
import getCartTotal from "../../utils/getCartTotal";

const CartSummary = () => {
  const { cartList } = useCart();

  console.log("Cartlist " + JSON.stringify(cartList));

  const { cartTotal, quantity } = getCartTotal(cartList);

  return (
    <>
      <div className="cart-footer m-auto mb-4">
        <div className="cart-offers">
          <div className="gift-wrapper flex-row m-2 ml-0">
            <div className="pl-1"></div>
          </div>
          <div className="coupon-wrapper flex-row items-center m-2 ml-0">
            <div className="input-field ml-0p5"></div>
          </div>
        </div>
        <div className="cart-recap">
          <div>
            <span className="cart-total">Tổng tiền:</span>
            <span className="price-detail-value">
              {cartTotal.toFixed(2)} VND
            </span>
          </div>

          <div>
            <span>Tổng số lượng: </span>
            <span className="price-detail-value">{quantity}</span>
          </div>

          <div>
            <span>Phí :</span>
            <span className="price-detail-value secondary-text fw-700">
              FREE
            </span>
          </div>
          <div className="fw-700 fw-700 border-top-1 text-md pt-0p5">
            <span>Tổng tiền : </span>
            <span className="price-detail-value">
              {cartTotal.toFixed(2)} VND
            </span>
          </div>
          <button className="button primary mt-1  radius-0 checkout-btn">
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
