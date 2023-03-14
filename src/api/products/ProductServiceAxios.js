import axiosInstance from "../customAxiosConfig/customAxiosConfig";
import getToken from "../../utils/TokenGetter";
import axios from "axios";

const GetAllProducts = async () => {

    try {
        const res = await axiosInstance.get("/products");
        return res;


    }
    catch(err) {
        return err;
    }

}

export const updateProductStatus = async (producId, status) => {
    try {
        const response = await axiosInstance.put(`/products/${producId}/${status}`,null, {headers: {Authorization : `${getToken()}` }} ).then(res => res.data);
        console.log("Log status " + response);
        return response;
    } catch (err) {return err;}
}

export const updateProduct = async (producId, data) => {
    try {
        return await axiosInstance.put(`/products/${producId}`, data, {headers: {Authorization : `${getToken()}` }} ).then(res => res.data);
    } catch (err) {return err;}
}

export const GetOneProduct = async (producId) => {
    try {
        return await axiosInstance.get(`/products/${producId}`);
    } catch (err) {
        return err;

    }
}

export const DeleteProduct = (producId) => {
 
    try {
        return axiosInstance.delete(`/products/${producId}`).then(res => res.data);

    }
    catch(err) {
        return err;
    }

}

export const CreateNewProduct = (data) => {
    try {
        return axiosInstance.post("/products", data, {headers: {Authorization : `${getToken()}` }}).then(res => res.data);
    }
    catch(err) {
        return err;
    }
}

export const UploadImageProduct = (formData) => {
    try {
       return axiosInstance.post('/products/upload', formData, {
            headers: { 'content-type': 'multipart/form-data'    
        }
        })
    }
    catch(err) {
        return err;
    }
}

export default GetAllProducts;