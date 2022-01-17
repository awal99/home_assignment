import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import {StoreContext} from '../../store/storeProvider';

const Wrapper = styled('div')(({theme})=>({
  
    maxWidth: '80%',
    marginLeft: '10%',
    marginTop:'10%',
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    [theme.breakpoints.down('sm')]:{
        maxWidth:'95%',
        marginLeft:'2.5%'
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCategoryDialog({handleClose}) {

const store = React.useContext(StoreContext);

const [errors,setErrors] = React.useState({});
const [formData, setFormData] = React.useState({
    name:""
})

    
const handleSave=()=>{
    let out =store.getCategoryByName(formData.name);
  
    //check for empty field
    if(formData.name === ""){
        setErrors({...errors,'name':"name field is required"})
    }else if(out.length){
        setErrors({...errors,'name':"category already exists"})
    }else{
        store.addNewCategory(formData);
        handleClose()
    }


}

const clearErrors=(e)=>{
    setErrors({...errors,[e.target.name]:""})
}

const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add New Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Input new category name and click save to create a new category.
          </DialogContentText>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
              <Wrapper>
              <TextField
                required
                id="name"
                name="name"
                label="Category Name"
                onChange={handleChange}
                defaultValue=""
                fullWidth
                onFocus={clearErrors}
                error={errors.name?true:false}
                helperText={errors.name?errors.name:""}
                />
              </Wrapper>
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button type="submit" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}