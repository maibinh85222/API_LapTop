import { useContext } from "react";
import { createContext, useEffect, useReducer } from "react";
import GetAllProducts from "../api/products/ProductServiceAxios";
import { initialReducerData, dataReducer } from "../reducer/dataReducer";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialReducerData);

  useEffect(() => {
    const getData = async () => {
      try {
        const productList = await GetAllProducts().then((res) => res.data);

        dispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: productList,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const value = {
    productList: state.productList,
    dispatch: dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
