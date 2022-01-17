import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {StoreContext} from '../store/storeProvider';
import Table from '../components/CategoriesTable';
import AddCategoryDialog from '../components/Dialogs/AddCategoryDialog';
import EditCategoryDialog from '../components/Dialogs/EditCategoryDialog';
import {useObserver} from 'mobx-react-lite';
import DeleteDialog from '../components/Dialogs/DeleteDialog';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const store = React.useContext(StoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [catData,setCatData] = React.useState([]);
  const [selected, setSelected] = React.useState([])//lets keep track of changes to rerender

  const [open,setOpen] = React.useState(false);
  const [edit,setEdit] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

//add category modal actions here
 const handleClose=()=>{
     setOpen(false);
     if(edit){
         setEdit(!edit)
     }

     if(store.storeVars.showDelete){
        store.setStoreVars({id:'showDelete',value:false})
     }
 }

  const loadCategoryData=async()=>{
      //load all categories here
      let data = await store.getAllCategories();
      setCatData(data);
  }

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
   
  ];
  
  React.useEffect(()=>{
    loadCategoryData();
  },[store.categories])


const handleSelectChange=(select)=>{
    setSelected(select)
}

const handleEditClick=()=>{
    if(store.selectedCats.length>1){
        alert('You cannot edit morethan on item at a time')
    }else{
        setEdit(true);
    }
}

const handleDeleteClick=()=>{
    store.setStoreVars({id:'showDelete',value:true})
   
}

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

  


   return useObserver(()=>(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         <StyledTypography variant="h5" color="inherit" component="div">
            {store.storeVars.currentPage}
          </StyledTypography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
           <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>setOpen(true)}>Add</Button>
            <Button disabled={store.selectedCats.length?false:true} onClick={handleEditClick}>Edit</Button>
            <Button disabled={store.selectedCats.length?false:true} onClick={handleDeleteClick}>Delete</Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
   
      {renderMenu}

    <Wrapper>
        <Table data={catData} headCells={headCells}/>
    </Wrapper>
        
     {open&&       
    <AddCategoryDialog handleClose={handleClose}/>
     }

    {edit&&       
    <EditCategoryDialog handleClose={handleClose} catID={store.selectedCats[0]}/>
     }

    {store.storeVars.showDelete &&       
        <DeleteDialog handleClose={handleClose} />
    }
    </Box>


   ));
}