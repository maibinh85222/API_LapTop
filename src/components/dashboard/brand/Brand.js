import { useState } from "react";
import { DeleteBrand, UpdateBrand } from "../../../api/brands/GetAllBrandService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { DeleteOutline } from '@mui/icons-material'
const Brand = (props) => {
    const {brand, update} = props;

   const [state, setState] = useState({
        confirm_delete: false,
        open_update: false,
        message : '',
        name: ''
   });

    useEffect(() => {
        fetchBrands();
    }, []); 


   console.log("Brand can xoa" + brand.id);

   
   const {confirm_delete, open_update, message, name} = state;


   const openUpdateCategory= (brandName) => {
        setState({...state, open_update: true});
   }

   const deleteBrand = async (idBrand) => {
        const response = await DeleteBrand(idBrand).then(res => res);
        console.log("response delete brand " + JSON.stringify(response));

        if(response.status == '204') {
            setState({...state, confirm_delete: false});
            toast.success("Delete sucessfully !");
            update();
        }
        else {
            console.log("Loi xoa brand");
            setState({...state, confirm_delete: false, message:"Error while deleting"});
        }
   }


   const deleteHandler = (e) => {
     e.preventDefault(); 
     setState({ ...state, confirm_delete : true})
   }

   const updateCategory = async (e, brandId) => {
    e.preventDefault();
    // const data = { name : state.name }
    const response = await UpdateBrand(brandId, state.name).then(res => res);
    if(response.status === 201) {

        toast.success("Update sucessfully !");
        setState({...state, open_update: false});
        update();        
    }
    else {
        toast.error("Error processing !");
    }

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
            changeStatus_Cate(params.row.id, params.row.enabled);
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


    return (

        <>
                {/* <h2>{message}</h2> */}
                <div className="category">
                            
                            <div>
                                <span>{brand.id}</span>
                                <span>{brand.name}</span>
                            </div>
                            <div className="actions">
                                <div onClick={deleteHandler} className="delete">
                                    <DeleteIcon />
                                </div>
                                <div onClick={()=>{openUpdateCategory(brand.name)}} className="update">
                                    <UpdateIcon />
                                </div>
                            </div>
                </div>


                { //open comfirm delete brand
                
                    !confirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{deleteBrand(brand.id)}}>Yes</button>
                            <button onClick={()=>{setState({...state, confirm_delete : false })}}>No</button>
                        </div>
                    </div>
                }

                
                { //open comfirm update brand
                                
                    !open_update ? '' :
                    <div className="confirm-delete">
                         <form onSubmit={(e)=>{ updateCategory(e, brand.id) }}>
                            <input onChange={(e)=>{setState({...state, name: e.target.value })}} value={name} type="text"/>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                }


                <ToastContainer />


        </>


    )
}

export default Brand;