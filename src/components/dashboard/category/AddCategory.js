import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from '@mui/material'
import { useEffect, useState } from "react";
import { AddNewCategory, UpdateCate } from "../../../api/categories/CategoryServiceAxios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const AddCategory = (props) => {

    

    let update_status = props.update_status;

    const [state, setState] = useState({
        open: true,
        category: "",
        confirm_add: true,
        checked: true,
        id: "",
        error: ""
        
    });

    useEffect(() => {
      console.log("Ben trong useEffect cate");
      if(update_status) {
        setState({...state, id: props.infor.id, category: props.infor.name, checked: props.infor.enabled});
      }
    }, []);

    const {open, category, confirm_add, checked } = state;

    const inputChanged = (event) => {
        setState({...state, [event.target.name]: event.target.value})

    }
    const addHandler = async () => {
      const data = {id: state.id, name: category, enabled: checked};
        if(update_status) {
          const response = await UpdateCate(data.id,data).then(res => res.data)
          .catch(error => {
            if (error.response && error.response.status === 400) {
                console.log("Da vao error");
                setState({...state, error: "Tên danh mục đã tồn tại "});
                throw new Error("Duplicated data");
            }
          })
          
        } else {
              await AddNewCategory(data).then(res => res.data)
              .catch(error => {
                  if (error.response && error.response.status === 400) {
                     setState({...state, error: "Tên danh mục đã tồn tại "});
                      throw new Error("Duplicated data");
                  }
                })
        }
        props.update();
    }

    const cancelHandler = () => {
        props.update();
    }

    const toggleChecked = () => {
      setState({...state, checked: !checked});
    }
  
      return (
          <div>
          
        <Dialog open = {open} aria-labelledby="form-dialog-title">
          
          <DialogTitle id="form-dialog-title">{update_status? "Update category" : "Add category"}</DialogTitle>
          <label style={{color: "red"}}>{state.error != null ? state.error : ""}</label>
          <DialogContent>
          
          {update_status? "" : <label htmlFor="">Enabled</label>}
          {update_status? "" : <FormControlLabel control={<Switch checked={checked} onChange={toggleChecked} />} />}
                         
              <TextField
                  autoFocus
                  name = 'category'
                  value = {category}
                  onChange = {inputChanged}
                  margin="dense"
                  label="Category name"
                  fullWidth
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
  export default AddCategory;