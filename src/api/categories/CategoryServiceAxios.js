import axiosInstance from "../customAxiosConfig/customAxiosConfig";
import getToken from "../../utils/TokenGetter";
import { getRefreshToken } from "../../utils/TokenGetter";


const GetAllCategories = () => {
    try {
        return axiosInstance.get("/categories",  {headers: {Authorization : `${getToken()}` }}).then(res => res.data);

    }
    catch(err) {
        return err;
    }
}



export const DeleteCategory = (cateId) => {
 
    try {
        return axiosInstance.delete(`/categories/${cateId}`,  {headers: {Authorization : `${getToken()}` }}).then(res => res.data);

    }
    catch(err) {
        return err;
    }

}


export const ChangeStatus = (cateId, status) => {
    try {
        return axiosInstance.put(`/categories/${cateId}/${status}`, null,
{
    headers: {
      Authorization:`${getToken()}`,
    }
}).then(res => res.data);

    }
    catch(err) {
        return err;
    }
}



export const UpdateCate = (cateId, data) => {
    try {
        return axiosInstance.put(`/categories/${cateId}`, data, {headers: {Authorization : `${getToken()}` }}).then(res => res.data);

    }
    catch(err) {
        return err;
    }
}
// export const AddNewCategory = (data) => {
//     try {
//         console.log("Da vao add new");
//         return axiosInstance.post("/categories/new", data,  {headers: {Authorization : `${getToken()}` }}).then(res => res.data);

//     }
//     catch(err) {
//         return err;
//     }
// }



export const AddNewCategory = (data) => {
    return axiosInstance.post("/categories/new", data,  {headers: {Authorization : `${getToken()}` }});
}

export default GetAllCategories;