import "./products.css";
import GetAllProducts, {
  GetOneProduct, updateProductStatus,
} from "../../../api/products/ProductServiceAxios";
import { DeleteProduct } from "../../../api/products/ProductServiceAxios";
import Header from "../navbar/header/Header";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import "../brand/brands.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddProductDialog from "./AddProductDialog";
import GetAllBrandService from "../../../api/brands/GetAllBrandService";
const ProductDemo = () => {
  // set products [] not null
  const [state, setState] = useState({
    confirm_delete: false,
    products: [],
    loading: false,
    delProd_id: null,
    open_update: false,
    show_add: false,
    brands: [],
    updateProduct: null,
    reloading : false
  });

  const {
    confirm_delete,
    products,
    loading,
    delProd_id,
    open,
    show_add,
    brands,
    updateProduct,
    open_update,
    reloading
  } = state;

  console.log("dagn setState");

  useEffect(() => {
    fetchProducts();
    // fetchBrands();
    // fetchCategories();
  }, [reloading]);

  // const fetchProducts = () => {
  //     GetAllProducts()
  //     .then(res=>{
  //         console.log("Product data are " + JSON.stringify(res.data));

  //         // setState is also a async operation
  //         setState({...state,  products: res.data })
  //         localStorage.setItem('products', JSON.stringify(res.data));
  //         fetchBrands();

  //     });

  // }

  const fetchProducts = async () => {
    const [productsRes, brandsRes] = await Promise.all([
      GetAllProducts(),
      GetAllBrandService(),
    ]);

    console.log("Product data are " + JSON.stringify(productsRes.data));
    console.log("Brand is " + JSON.stringify(brandsRes.data));

    setState({
      ...state,
      products: productsRes.data,
      brands: brandsRes.data,
    });

    localStorage.setItem("products", JSON.stringify(productsRes.data));
  };

  // const fetchProducts = () => {
  //   GetAllProducts()
  //     .then(res => {
  //       console.log("Product data are " + JSON.stringify(res.data));

  //       // setState is also a async operation
  //       setState({...state, products: res.data}, () => {
  //         localStorage.setItem('products', JSON.stringify(res.data));
  //         fetchBrands();
  //       });
  //     });
  // };

  const fetchBrands = async () => {
    console.log("Trong fetch Brands");
    await GetAllBrandService().then((res) => {
      console.log("Brand is " + JSON.stringify(res.data));
      setState({ ...state, brands: res.data });
    });
  };

  const reloadingHandler = () => {
    setState({...state, show_add: false, open_update: false, reloading: !reloading});
  }

  const deleteHandler = async (prod_id) => {
    console.log("Da vao delete Handler");
    // setState({ ...state, confirm_delete : true, delProd_id: prod_id})
  };

  const updateStatus = async (productId, status) => {
    console.log("update status " + productId + " " + status );
    await updateProductStatus(productId,  status ? "disabled" : "enabled").then(res => res);
    setState({...state, reloading: ! reloading});
  }

  const deleteProduct = async (prod_id) => {
    const response = await DeleteProduct(prod_id).then(
      (res) => res.successCode
    );
    console.log("Code is " + response);
    if (response === "DELETE_PRODUCT_SUCCESS") {
      toast.success("Delete sucessfully !");
      // setState({...state, open_update: false});
      setState({ ...state, confirm_delete: !state.confirm_delete });
      // update();
    } else {
      toast.error("Error while processing !");
    }
  };

  const addProduct = () => {
    console.log("Da vao add product");
    setState({ ...state, show_add: true });
  };

  const updateHandler = async (productId) => {
    const response = await GetOneProduct(productId).then((res) => res.data);
    console.log("Product update " + JSON.stringify(response));
    setState({...state, updateProduct: response.data, open_update: true});
  }

  const columns = [
    { field: "prod_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.primaryImage}
              alt=""
            />
            {/* {params.row.primaryImage} */}
          </div>
        );
      },
    },

    { field: "prodName", headerName: "Product Name", width: 200 },
    {
      field: "enabled",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const statusHandler = () => {
          updateStatus(params.row.prod_id, params.row.enabled);
        }
        return (
          <>
            <FormControlLabel
              control={<Switch onChange={statusHandler} checked={params.row.enabled} />}
            />
          </>
        );
      },
    },
    {
      field: "original_price",
      headerName: "Price",
      width: 160,
    },
    // { field: "brandName", headerName: "Brand Name", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const updateProduct = () => {
          updateHandler(params.row.prod_id);
        }
        return (
          <>
            {/* <Link to={"/product/" + params.row.prod_id}>
                </Link> */}
            <button
              className="productListEdit"
              onClick={updateProduct}
            >
              Edit
            </button>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteHandler(params.row.prod_id)}
            />
          </>
        );
      },
    },
  ];

  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div className="products categories">
      {console.log("chay truoc ne")}

      {
        //open comfirm delete brand

        !confirm_delete ? (
          ""
        ) : (
          <div className="comfirm-delete">
            <div>
              <h3>Are you sure want to delete?</h3>
              <button
                onClick={() => {
                  deleteProduct(delProd_id);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setState({ ...state, confirm_delete: false });
                }}
              >
                No
              </button>
            </div>
          </div>
        )
      }

      {!show_add ? (
        ""
      ) : (
        <div>
          <AddProductDialog brands={brands} open={true} reloading={reloadingHandler} />
        </div>
      )}

      {!open_update ? (
        ""
      ) : (
        <div>
          <AddProductDialog update={true} updateProduct= {updateProduct} brands={brands} open={true} reloading={reloadingHandler} />
        </div>
      )}

      <div className="wrapper">
        <div
          style={{ transition: "0.5s" }}
          className="new"
          onClick={addProduct}
        >
          <AddIcon />
        </div>
        <div style={{ height: 300, width: "100%" }}>
          {console.log("product lists datagrid is" + products)}
          <DataGrid
            rows={products}
            columns={columns}
            //  getRowId={(row: any) =>  generateRandom()}
            getRowId={(row) => row?.prod_id}
          />
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDemo;
