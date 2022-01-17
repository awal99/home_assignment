
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const Home = React.lazy(() => import('../pages/Home'));

export const InitRoutes=()=>{
    return(
    <BrowserRouter>
        <Routes>
        <Route path="/" element={ 
              <React.Suspense fallback={<>...</>}>
                    <Home />
              </React.Suspense>}>
            <Route index element={
            <React.Suspense fallback={<>...</>}>
                    <Home />
              </React.Suspense>} />
        </Route>
        </Routes>
    </BrowserRouter>
    
    );
}