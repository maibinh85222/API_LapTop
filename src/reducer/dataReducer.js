const initialReducerData = {
  // note: array - productList : state.productList
  productList: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      return {
        ...state,
        productList: action.payload,
      };

    case "CATEGORY_GROUP_NAME":
      return { ...state, categoryGroupName: action.payload };

    default:
      throw new Error("Lỗi trong reducer");
  }
};

export { initialReducerData, dataReducer };
