import "../brand/brands.css";
import Navbar from '../navbar/Navbar';
import Header from '../navbar/header/Header';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import AddCategory from "./AddCategory";
import { DataGrid } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DeleteOutline } from '@mui/icons-material'
import { ChangeStatus } from "../../../api/categories/CategoryServiceAxios";
import {DeleteCategory} from "../../../api/categories/CategoryServiceAxios";
import GetAllCategories from "../../../api/categories/CategoryServiceAxios";
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from "../../LoadingSpinner";
const Categories = () => {

    

    const [state, setState] = useState({
        isLoading : false,
        categories: [],
        show_add: false,
        confirm_delete: false,
        show_dialog:false,
        updated: false,
        delCate_id: null,
        open_update: false,
        update_Category: {}
      });


    const {isLoading, categories,show_add, open_update, confirm_delete, updated, delCate_id, show_dialog} = state;

    console.log("Ben trong categories " + show_add );
    const addHandler = () => {
        setState({...state, show_add: !show_add});
    }

    useEffect(() => {
        fetchCategories();
    }, [updated]);


    const fetchCategories = async () => {
        setState({...state, isLoading: true});
        await GetAllCategories().then(res => {
            console.log("categories are " + res);
            setState({...state, isLoading: false,  categories : res });
        }  
    )
    }

    const matchingHandler = () => {
        if(open_update) {
            setState({...state, open_update: ! open_update, updated: !updated});
        } else
        setState({...state, show_add: !show_add, updated: !updated});
        
    }

    const updateStatus = async (cate_id, status) => {
        const response = await ChangeStatus(cate_id, status ? "disabled" : "enabled").then(res=> res);
        setState({...state, updated: !updated});
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 200 },
        {
          field: "enabled",
          headerName: "Status",
          width: 120,
          renderCell: (params) => {
            const statusHandler = () => {
                updateStatus(params.row.id, params.row.enabled);
            }
            return (
              <>
                <FormControlLabel control={<Switch checked={params.row.enabled} onChange={statusHandler} />} />
              </>
            );
          },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                const updateHandler  = () => {
                    // update_Category = {id: params.row.id, name : params.row.name }
                    setState({...state, open_update: !open_update, show_dialog: !show_dialog, update_Category : {id: params.row.id, name : params.row.name, enabled: params.row.enabled }});
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

    const deleteHandler = (cate_id) => {
        setState({ ...state, confirm_delete : true, delCate_id: cate_id});
    
    }

    const deleteCategory = async () => {
        const response = await DeleteCategory(delCate_id).then(res => res);
        setState({...state, updated: !updated, confirm_delete: !confirm_delete});
        if(response.errorCode) {
            toast.error(response.data);
        
        }
        else {
            toast.success("Delete sucessfully !");
        }
    }

    return (
        <div className="categories">
            {
                isLoading? <LoadingSpinner asOverlay /> : <div className="wrapper">
                    <span>Categories</span>
                    {/* button for add category */}                
                    <div style={{ transition: '0.5s' }} className="new" onClick= {addHandler}>
                        <AddIcon />
                    </div>

            
                    { categories.length === 0 ? <div style={{color: "red"}}>Empty</div> :
                    
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={categories} columns={columns} 
                        // getRowId={(row: any) =>  generateRandom()}
                        getRowId={(row) => row?.name}
                        />
                    </div>
                    
                    }

                </div>
            }
            {show_add && <AddCategory update= {matchingHandler} />}
            { //open comfirm delete brand
                
                !confirm_delete ? '' :
                <div className="comfirm-delete">
                    <div>
                        <h3>Are you sure want to delete?</h3>
                        <button onClick={()=>{deleteCategory()}}>Yes</button>
                        <button onClick={()=>{setState({...state, confirm_delete : false })}}>No</button>
                    </div>
                </div>
            }


            {open_update && <AddCategory infor= {state.update_Category} update_status ={open_update } update= {matchingHandler} />}

            <ToastContainer />

        </div>


    )
}


export default Categories;