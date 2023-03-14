
const cartReducer = (state, action) => {

    // console.log("Cart reducer "+ JSON.stringify(action)  + " " + JSON.stringify(action.data) + " " + JSON.stringify(state));
    console.log("Da vao cart reducer");

    switch(action.type) {
        case "SET_CART":
            return {...state, cartList : action.payload};

        default:
            return state;
    }

}

export {cartReducer};