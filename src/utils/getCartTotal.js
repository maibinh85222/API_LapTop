

const getCartTotal = (cartList) => {

    return cartList.reduce(({cartTotal, quantity}, item) => {

        console.log("Vao reducer " + cartTotal + " " + quantity);

        cartTotal += (item.product.original_price - (item.product.original_price * item.product.discount_percent))* item.quantity;
        quantity += item.quantity;
        return {cartTotal, quantity};

    }, {cartTotal: 0, quantity: 0})

}
export default getCartTotal;

