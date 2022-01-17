import React from 'react';
import {StoreProvider} from './store/storeProvider';
import {InitRoutes} from './routes/initRoutes';
import './App.css';


function App() {
  return (
    <StoreProvider>
    
        <InitRoutes/>
     
    </StoreProvider>
  );
}

export default App;
