import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '../components/LocationsTable';
import {StoreContext} from "../store/storeProvider";
import {useObserver} from 'mobx-react-lite';
import DeleteDialog from '../components/Dialogs/DeleteDialog';
import AddLocationDialog from "../components/Dialogs/AddLocationDialog";
import EditLocationDialog from "../components/Dialogs/EditLocationDialog";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const StyledTypography = styled(Typography)(({theme})=>({
    textTransform:"capitalize",
    fontWeight: "bold",
}));

const Wrapper = styled('div')(({theme})=>({
    height:"100vh",
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

const SmallWrapper = styled('div')(({theme})=>({
   
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


export default function Locations() {
  const store = React.useContext(StoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [locData,setLocData] = React.useState([]);
  
  const [open,setOpen] = React.useState(false);
  const [edit,setEdit] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const filterData=()=>{

  }

  const handleEditClick=()=>{
    if(store.selectedLocs.length>1){
        alert('You cannot edit more than on item at a time')
    }else{
        setEdit(true);
    }
}

const loadLocationData=async()=>{
   
    let data = await store.getAllLocations();
    setLocData(data);
}

const handleDeleteClick=()=>{
    store.setStoreVars({id:'showDelete',value:true})
   
}

const handleClose=()=>{
    setOpen(false);
    if(edit){
        setEdit(!edit)
    }

    if(store.storeVars.showDelete){
       store.setStoreVars({id:'showDelete',value:false})
    }
}

const handleChange=(e)=>{
    let filtered = locData.filter(flt=>flt.category == e.target.value);
    if(filtered.length > 0){
        setLocData(filtered);
    }else{
        setLocData(store.locations);
    }
   
   
   
}

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: 'ID',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'coordinates',
        numeric: false,
        disablePadding: false,
        label: 'Coordinates',
    }
   
  ];
  


  React.useEffect(()=>{
      loadLocationData()
  },[store.locations])

  
  return useObserver(()=>(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <StyledTypography variant="h5" color="inherit" component="div">
            {store.storeVars.currentPage}
          </StyledTypography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
           <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>setOpen(true)}>Add</Button>
            <Button disabled={store.selectedLocs.length?false:true} onClick={handleEditClick}>Edit</Button>
            <Button disabled={store.selectedLocs.length?false:true} onClick={handleDeleteClick}>Delete</Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
   
      {renderMenu}

      <SmallWrapper>
      <ButtonGroup>
      <FormControl sx={{minWidth:200}}  fullWidth >
            <InputLabel id="filter">Filter By Category</InputLabel>
                <Select
                    required
                    labelId="filter"
                    id="filter"
                    name="filter"
                    
                    label="Filter"
                    onChange={handleChange}
                 
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
        </ButtonGroup>
      </SmallWrapper>


    <Wrapper>  
        <Table data={locData} headCells={headCells}/>
    </Wrapper>
        
      {open&&       
    <AddLocationDialog handleClose={handleClose}/>
     }

     {edit&&       
    <EditLocationDialog handleClose={handleClose} id={store.selectedLocs[0]}/>
     } 

    {store.storeVars.showDelete &&       
        <DeleteDialog handleClose={handleClose} />
    }
    </Box>



    ));
}