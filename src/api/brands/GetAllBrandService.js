import axiosInstance from "../customAxiosConfig/customAxiosConfig";
import getToken from "../../utils/TokenGetter";


export const GetBrandCategories = async (brandId) => {
    try {
        const res = await axiosInstance.get(`/brands/${brandId}/categories`).then(res => res.data);
        return res;


    }
    catch(err) {
        return err;
    }

}

const GetAllBrandService =  () => {

    try {
        return axiosInstance.get("/brands");
    }
    catch(err) {
        return err;
    }

}

export const CreateNewBrandService = async (data) => {
    try {
        return await axiosInstance.post("/brands", data, {headers: {Authorization : `${getToken()}` }}).then(res => res);

    }
    catch(err) {
        return err;
    }

}

export const DeleteBrand = (brandId) => {
    try {
        return axiosInstance.delete(`/brands/${brandId}`, {headers: {Authorization : `${getToken()}` }});
    }catch(err) {
        return err
    }
}


export const UpdateBrand = (brandId, data) => {
    console.log("Data gui di la " + JSON.stringify(data));
    try {
        return axiosInstance.put(`/brands/${brandId}`, data, {headers: {Authorization : `${getToken()}` }}).then(res => res);
    }
    catch(err) {
        console.log(err);
        return err;
    }
}


export default GetAllBrandService;