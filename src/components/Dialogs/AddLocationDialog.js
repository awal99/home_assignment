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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'

import { Box } from '@mui/material';
import Select from '@mui/material/Select';
import {StoreContext} from '../../store/storeProvider';

import MapPicker from 'react-google-map-picker'

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

export default function AddLocationDialog({handleClose}) {

const store = React.useContext(StoreContext);

const [defaultLocation, setDefaultLocation] = React.useState({ lat: 10, lng: 106});

  const [location, setLocation] = React.useState(defaultLocation);
  const [zoom, setZoom] = React.useState(10);

const [errors,setErrors] = React.useState({});
const [formData, setFormData] = React.useState({
    name:"",
    category:"",
    address:"",
    coordinates:""
})

    
const handleSave=()=>{
   // let out =store.getLocationByName(formData.name);
  
    formData.coordinates = location;

    console.log("FORMDATA",formData)
    //check for empty field
    if(formData.name === ""){
        setErrors({...errors,'name':"name field is required"})
    }else if(formData.address === ""){
        setErrors({...errors,'address':"address field is required"})
    }else if(formData.category === ""){
        setErrors({...errors,'category':"category field is required"})
    }else{
        store.addNewLocation(formData);
        handleClose();
    }



}

function handleChangeLocation(lat, lng){
    setLocation({lat:lat, lng:lng});
  }

function handleChangeZoom (newZoom){
    setZoom(newZoom);
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
        aria-describedby="alert-dialog"
      >
        <DialogTitle>{"Add New Location"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog">
            Input new Location data and save. all * fields are required.
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
                label="Location Name"
                onChange={handleChange}
                defaultValue=""
                fullWidth
                onFocus={clearErrors}
                error={errors.name?true:false}
                helperText={errors.name?errors.name:""}
                />
              </Wrapper>

              <Wrapper>
              <FormControl  fullWidth error={errors.category?true:false}>
                  <InputLabel id="category">Category</InputLabel>
                    <Select
                    required
                   
                    labelId="category"
                    id="category"
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                 
                    helperText={errors.category?errors.category:""}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        store.categories.map((cat)=>{
                            return (
                            <MenuItem value={cat.name}>{cat.name}</MenuItem>
                            )
                        })                    }
                
                    </Select>
                </FormControl>
              </Wrapper>

              <Wrapper>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                onChange={handleChange}
                defaultValue=""
                fullWidth
                onFocus={clearErrors}
                error={errors.address?true:false}
                helperText={errors.address?errors.address:""}
                />
              </Wrapper>

              <Wrapper><>{location.lat+","+location.lng}</></Wrapper>
              <MapPicker defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height:'400px'}}
                onChangeLocation={handleChangeLocation} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>

           
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