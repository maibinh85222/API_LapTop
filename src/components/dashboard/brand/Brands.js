import "./brands.css"
import Navbar from '../navbar/Navbar';
import Header from '../navbar/header/Header';

import AddBrand from "./AddBrand";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import GetAllBrandService from "../../../api/brands/GetAllBrandService";
import { DeleteBrand, ChangeStatus } from "../../../api/brands/GetAllBrandService";
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteOutline } from '@mui/icons-material'
import Switch from '@mui/material/Switch';
import LoadingSpinner from "../../LoadingSpinner";
import GetAllCategories from "../../../api/categories/CategoryServiceAxios";

const Brands = () => {

    const [state, setState] = useState({
        brands: [],
        isLoading : true,
        show_add: false,
        confirm_delete: false,
        show_dialog:false,
        updated: false,
        brandId: null,
        open_update: false,
        update_brand: {},
        categories: [],
        deleteId: null,
        selected_cate: []
      });


    const {isLoading, selected_cate, categories, brands ,show_add, open_update, confirm_delete, updated, deleteId, show_dialog} = state;

    console.log("Tren return");
    
    
    useEffect(() => {
        
        // 2 methods are async
        fetchBrands();
        // fetchCategories();
        
    }, [updated]);
    
    const addHandler = () => {
        setState({...state, show_add: !show_add});
    }
    

    const matchingHandler = () => {
        if(open_update) {
            setState({...state, open_update: ! open_update, updated: !updated});
        } else
        setState({...state, show_add: !show_add, updated: !updated});
        
    }

    const fetchCategories = async () => {
        console.log("Ben trong fetch Categories");
        const response = await GetAllCategories().then(res => res);
        console.log("Data cate " + JSON.stringify(response));
        setState({...state, categories : response }); 
        console.log("Sau get categories");
    }

    const fetchBrands = async () => {

        const allBrands = await GetAllBrandService().then(res => res.data);
        const allCates = await GetAllCategories().then(res => res);
        console.log("Data brand " + JSON.stringify(allBrands));
        setState({...state,isLoading: false, brands : allBrands, categories: allCates });
        };

    const deleteHandler = (brandId) => {
        setState({ ...state, confirm_delete : true, deleteId: brandId});
    
    }

    const deleteBrand = async () => {
        const response = await DeleteBrand(deleteId).then(res => {
            
            if(res.status == '204') {
                toast.success("Delete sucessfully !");
            
            }
        });
        setState({...state, updated: !updated, confirm_delete: !confirm_delete});
    }

   const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            const updateHandler  = () => {
                // update_Category = {id: params.row.id, name : params.row.name }
                setState({...state, open_update: !open_update, show_dialog: !show_dialog, update_brand : {id: params.row.id, name : params.row.name}, selected_cate: params.row.categories});
                console.log("After update handler");
            }
          return (
            <>
                <button className="productListEdit" onClick= {updateHandler} >Edit</button>
                <DeleteOutline
                    className="productListDelete" 
                    onClick={() => deleteHandler(params.row.id)}
                />
            </>
          );
        },
      }
    
  ];

    return (
        <div className="categories">
            
       {
        isLoading? <LoadingSpinner asOverlay /> : 

        <div className="wrapper">
            <span>Brands</span>              
            <div style={{ transition: '0.5s' }} className="new" onClick= {addHandler}>
                <AddIcon />
            </div>
   
                { brands.length === 0 ? <div style={{color: "red"}}>Empty</div> :
                
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid rows={brands} columns={columns} 
                    // getRowId={(row: any) =>  generateRandom()}
                    getRowId={(row) => row?.id}
                    />
                </div>
                
                }

            </div>  
       }
       
        {show_add && <AddBrand update= {matchingHandler} categories= {categories} />}
        { //open comfirm delete brand
            
            !confirm_delete ? '' :
            <div className="comfirm-delete">
                <div>
                    <h3>Are you sure want to delete?</h3>
                    <button onClick={()=>{deleteBrand()}}>Yes</button>
                    <button onClick={()=>{setState({...state, confirm_delete : false })}}>No</button>
                </div>
            </div>
        }

        {open_update && <AddBrand infor= {state.update_brand} categories= {categories} category = {selected_cate} update_status ={open_update} update= {matchingHandler} />}

        <ToastContainer />
    </div>


    )
}


export default Brands;