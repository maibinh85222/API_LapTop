import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from '@mui/material'
import { CreateNewBrandService } from "../../../api/brands/GetAllBrandService";
import { UpdateBrand } from "../../../api/brands/GetAllBrandService";
import { useState } from "react";
import "./add.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select from 'react-select';
import InputLabel from '@mui/material/InputLabel';


const AddBrand = (props) => {

   

    let update_status = props.update_status;

    const [state, setState] = useState({
        open: true,
        brand: "",
        confirm_add: true,
        checked: true,
        id: "",
        error: "",
        categories: props.categories
        
    });
    
    const [selected, setSelected] = useState([]);


    useEffect(() => {
        console.log("Ben trong useEffect cate");
        if(update_status) {
          // console.log("Ben trong edit " + JSON.stringify(props.categories));
          setState({...state, id: props.infor.id, brand: props.infor.name});
          console.log("Category selected" + JSON.stringify(props.category));
          // setSelected(props.category.map(cate => (
    
          //   {
          //     value: cate.id,
          //     label: cate.name,
          //   }

          // )));
        
        }
      }, []);

    const {open, brand, categories, confirm_add, checked } = state;

    const cateOptions = categories.map((cate) => (
      {
        value: cate.id,
        label: cate.name,
      }
    ));

    const inputChanged = (event) => {
        setState({...state, [event.target.name]: event.target.value})

    }
    const toggleChecked = () => {
      setState({...state, checked: !checked});
    }

    const cancelHandler = () => {
      props.update();
  }

    const categoryHandlerChange = (selectedOptions) => {
      setSelected(selectedOptions.map((option) => option.value));
    };
  
    // using async-await to run representively, prevent update() function runs fistly
    const addHandler = async () => {
          const data = {cateIds : selected, brandName: brand};
          if(update_status) {
            console.log("catename in update" + data.brandName);
            await UpdateBrand(props.infor.id,data).then(res => res.data)
            .catch(error => {
              if (error.response && error.response.status === 400) {
                  setState({...state, error: "Tên hãng đã tồn tại "});
                  throw new Error("Duplicated data");
              }
            })
          }
          else {
            await CreateNewBrandService(data).then(res => res.data)
            .catch(error => {
              if (error.response && error.response.status === 400) {
                setState({...state, error: "Tên hãng đã tồn tại "});
                throw new Error("Duplicated data");
              }
            })
          }        

        props.update();
      }
      

    return (
        <div>
          
        <Dialog open = {open} aria-labelledby="form-dialog-title">
          
          <DialogTitle id="form-dialog-title">{update_status? "Update category" : "Add category"}</DialogTitle>
          <label style={{color: "red"}}>{state.error != null ? state.error : ""}</label>
          <DialogContent>
      
              <TextField
                  autoFocus
                  name = 'brand'
                  value = {brand}
                  onChange = {inputChanged}
                  margin="dense"
                  label="Brand name"
                  fullWidth
              />

              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              {/* <select
                  
                  label="Age"
                  multiple
              >

                { console.log(`so luong categories la` + categories.length)}

                {
                  categories.map((data) => (

                    <option key={data} optionvalues={data.name}>
                       {data.name}
                  </option>
                  ))
                }
                
              </select> */}

            {"Category option " + JSON.stringify(cateOptions)}

          <Select
                    isMulti
                    name="categories"
                    options={cateOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={categoryHandlerChange}
                    // value={selected}
                    required
                  />

          </DialogContent>
          <DialogActions>
            <Button  color="primary" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button  color="primary" onClick= {addHandler}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default AddBrand;