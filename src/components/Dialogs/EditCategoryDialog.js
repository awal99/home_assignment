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

export default function EditCategoryDialog({catID,handleClose}) {

const store = React.useContext(StoreContext);

const [errors,setErrors] = React.useState({});
const [formData, setFormData] = React.useState({
    name:""
})

    
const handleSave=()=>{
    //check for empty field
    if(formData.name === ""){
        setErrors({...errors,'name':"name field is required"});

    }else{
        store.updateCategories(formData);
        //close dialog
        handleClose();
    }


}

const setValues=(catID)=>{
    //lets get the values from store then set default values of the form
    let dfv = store.getCategoryByID(catID);
    if(dfv.length > 0){
       setFormData({
           ...formData,...dfv[0]
       })
    }

}

React.useEffect(()=>{
    setValues(catID);
},[])

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
        <DialogTitle>{"Edit Category"}</DialogTitle>
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
                value={formData.name}
                onChange={handleChange}
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
          <Button type="submit" onClick={handleSave}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}