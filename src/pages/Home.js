import React,{useContext, useEffect, Suspense} from 'react';

import {StoreContext} from "../store/storeProvider"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Category,Map} from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { mainRoute } from '../routes/MainRoute';

 const Home=(props)=>{

    const store = useContext(StoreContext);
    const [value, setValue] = React.useState(0);


    //function to fetch from local store
const loadstore=async()=>{
    let data = await localStorage.getItem("locationsStore");
    data = JSON.parse(data);
    if(data != null){
    //lets set to mobx store
    store.setLocations(data[0]);
    store.setCategories(data[1]);
    }
  }

    React.useEffect(()=>{
        //lets load the localstore values and set to our mobx store
        loadstore();
    },[])

    return(
        <Box>
        <CssBaseline/>

        {/* //main body here */}
        <Suspense fallback={<div>Loading...</div>}>
            {mainRoute.map(route=>{
                if(route.path === store.storeVars.currentPage){
                   return (<route.component></route.component>)
                }
            })}
        </Suspense>

        {/* //end of main body */}

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            let newVal = "/";
            switch(newValue){
                case 0:
                    newVal = "/categories";
                    break;
                case 1:
                    newVal = "/locations";
                    break;
                default:
                    return;
            }
            store.setStoreVars({id:'currentPage',value:newVal});
          }}
        >
          <BottomNavigationAction label="Categories" icon={<Category />} />
          <BottomNavigationAction label="Locations" icon={<Map />} />
        </BottomNavigation>
        </Paper>
        </Box>
    )
}

export default Home;