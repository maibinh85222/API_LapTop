import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import ReactQuill from "react-quill";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  CreateNewProduct,
  updateProduct,
  UploadImageProduct,
} from "../../../api/products/ProductServiceAxios";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import GetAllBrandService, {
  GetBrandCategories,
} from "../../../api/brands/GetAllBrandService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const AddProductDialog = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    discountPercent: "",
    open: props.open,
    brands: props.brands,
    category: [],
    selectedBrand: props.brands[0].id,
    cate_id: null,
    imgUrl: null,
    enabled: true,
    inStock: true,
    quantity: "",
  });

  console.log("Update product is " + JSON.stringify(props.updateProduct));

  const {
    name,
    description,
    price,
    discountPercent,
    open,
    brands,
    category,
    selectedBrand,
    cate_id,
    imgUrl,
    quantity,
  } = state;

  useEffect(() => {
    if (props.update) {
      const product = props.updateProduct;
      console.log("Product trong effect " + JSON.stringify(product));
      let preview = document.getElementById("imagePreview");
      if (preview) {
        preview.src = product.primaryImage;
      }
      setState({
        ...state,
        // description: product.description,
        name: product.prodName,
        price: product.original_price,
        discountPercent: product.discount,
        inStock: product.inStock,
        description: product.description,
        selectedBrand: product.brandId,
        cate_id: product.categoryId,
        imgUrl: product.primaryImage,
      });
    }
  }, [document.getElementById("imagePreview")]);

  useEffect(() => {
    console.log("Dang trong useEffect 2");
    fetchCategories(selectedBrand);
  }, [selectedBrand]);

  const fetchCategories = async (brandId) => {
    await GetBrandCategories(brandId).then((res) => {
      console.log("Brand cates is " + JSON.stringify(res));
      console.log("Effect trong cate");
      setState((prevState) => ({ ...prevState, category: res.data }));
    });
  };
  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);

    let formData = new FormData();
    formData.append("file", file);

    const res = await UploadImageProduct(formData).then((res) => res);
    console.log("Img url " + JSON.parse(JSON.stringify(res)).data);
    setState({ ...state, imgUrl: JSON.parse(JSON.stringify(res)).data });
    let src = URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("imagePreview");
    preview.src = src;
    preview.style.display = "block";
  };

  const changeHandler = (e) => {
    console.log(
      "Change handler " +
        e.target.name +
        e.target.value +
        " va " +
        e.target.name
    );
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    console.log("dismiss dialog");
    setState({ ...state, open: false });
    props.reloading();
  };

  const brandHandler = (e) => {
    console.log("Brand id  is " + e.target.value);
    setState({ ...state, selectedBrand: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedCategoryId = formData.get("cate_id");
    const data = {
      name: name,
      description: description,
      original_price: price,
      discount_percent: discountPercent,
      enabled: true,
      inStock: true,
      brandId: selectedBrand,
      categoryId: selectedCategoryId,
      primaryImage: imgUrl,
      productQty: quantity,
    };

    if (props.update) {
      const response = updateProduct(props.updateProduct.prod_id, data).then(
        (res) => res
      );
      if (!response.errorCode) {
        handleClose();
        toast.success("Cập nhật thành công!");
      } else {
        handleClose();
        toast.error("Lỗi không cập nhật sản phẩm");
      }
    } else {
      const response = CreateNewProduct(data).then((res) => res);
      if (!response.errorCode) {
        handleClose();
        toast.success("Thêm sản phẩm thành công!");
      } else {
        handleClose();
        toast.error("Lỗi không thêm được sản phẩm");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {props.update ? "Cập nhật sản phẩm " : " Thêm sản phẩm mới "}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="photo">
            <div className="image">
              <img
                id="imagePreview"
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <label htmlFor="photo">
              <PermMediaIcon />
            </label>
            <br />
            <input
              onChange={handleImage}
              id="photo"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            label="Tên sản phẩm"
            fullWidth
            value={name}
            onChange={(event) =>
              setState({ ...state, name: event.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Giá cả"
            fullWidth
            type="number"
            value={price}
            onChange={(event) =>
              setState({ ...state, price: event.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Phần trăm giảm giá"
            fullWidth
            type="number"
            value={discountPercent}
            onChange={(event) =>
              setState({ ...state, discountPercent: event.target.value })
            }
          />

          {console.log(
            "Value of des " + selectedBrand + cate_id + props.update
          )}

          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="" style={{ marginRight: "10px" }}>
              Nhãn hàng
            </label>
            <select
              name="brand_id"
              id="brand"
              defaultValue={
                props.update ? props.updateProduct.brandId : brands[0].id
              }
              onChange={brandHandler}
            >
              {/* <option value="{selectedBrand}">Chọn nhãn</option> */}
              {brands.map((brand) => {
                return (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                );
              })}
            </select>

            <div style={{ margin: "20px 0px" }}>
              <label htmlFor="" style={{ marginRight: "10px" }}>
                Danh mục
              </label>
              <select
                name="cate_id"
                id="category"
                defaultValue={
                  props.update
                    ? props.updateProduct.categoryId
                    : category.length > 0
                    ? category[0].id
                    : ""
                }
                onChange={changeHandler}
              >
                {/* <option value="">Chọn danh mục</option> */}
                {category.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {props.update && (
            <div style={{ margin: "20px 0px" }}>
              <label htmlFor="">Trạng thái </label>
              <select
                name="inStock"
                id="inStock"
                defaultValue={
                  props.updateProduct ? props.updateProduct.inStock : ""
                }
              >
                <option value="true">Còn hàng</option>
                <option value="false">Hết hàng</option>
              </select>
            </div>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Số lượng"
            fullWidth
            value={quantity}
            onChange={(event) =>
              setState({ ...state, quantity: event.target.value })
            }
          />
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="description">Description</label>

            <ReactQuill
              theme="snow"
              name="description"
              className="description"
              value={description}
              onChange={(value) => setState({ ...state, description: value })}
              id="description"
            />
          </div>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Huỷ bỏ
            </Button>
            <Button color="primary" type="submit">
              {props.update ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      <ToastContainer />
    </Dialog>
  );
};

export default AddProductDialog;
