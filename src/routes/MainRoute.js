
import React from 'react';



const Categories = React.lazy(() => import('../pages/Categories'));
const Locations = React.lazy(() => import('../pages/Locations'));

export const mainRoute=[
    {path:"/categories",name:"categories",exact:true,component:Categories},
    {path:"/locations",name:"locations",exact:true,component:Locations}

];