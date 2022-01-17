
import React, { createContext,useEffect } from "react";
import { useLocalObservable } from "mobx-react-lite";

//function to update localstore
const updateStore=async(data)=>{
    let sdata = await localStorage.getItem("locationsStore");
    if(sdata == data){
        console.log("all set");
    }else{
        await localStorage.setItem("locationsStore",JSON.stringify(data));
    }
  }



export const StoreProvider = ({ children }) => {

  const store = useLocalObservable(() => ({
        categories : [{
            id:1,
            name: "all",
        }],

        storeVars:{
            currentPage:'/categories',
            showDelete:false,
        },

        setStoreVars(data){
            this.storeVars = {...this.storeVars,[data.id]:data.value}
        },

        locations : [{
                id:1,
                name:"kukuo",
                address:"kuss83",
                coordinates:"miijnrofknlew jwhenfe",
                category:"all"
            }],

        selectedCats: [],
        selectedLocs: [],

        setSelectedCats(select){
            this.selectedCats=[...select];
        },

        setLocations(data){
            this.locations = data
        },

        setCategories(data){
            this.categories = data
        },

        setSelectedLocs(select){
            this.selectedLocs=[...select];
        },

        //method to generate random IDs for items
        generateID:()=>{
            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            var uniqid = randLetter + Date.now();
            return uniqid;
        },

        updateCategories(data){
            this.categories.map(item=>{
                if(item.id===data.id){
                    item.name = data.name;
                }
            });
            //set data to store
            updateStore([this.locations,this.categories]);
        },

        deleteCategory(){
            this.selectedCats.map(slct=>{
                this.categories = this.categories.filter(ft=>ft.id !== slct)
            })
            //set data to store
            updateStore([this.locations,this.categories]);
        },

        deleteLocation(){
           
            this.selectedLocs.map(slct=>{
                this.locations = this.locations.filter(ft=>ft.id !== slct)
            })
            //set data to store
            updateStore([this.locations,this.categories]);
        },

        updateLocations(data){
            this.locations.map(item=>{
                if(item.id===data.id){
                    item.name = data.name;
                    item.coordinates = data.coordinates;
                    item.address = data.address;
                    item.category = data.category
                }
            })

             //set data to store
             updateStore([this.locations,this.categories]);
        },

        addNewCategory(data){
            let uid = this.generateID();
            this.categories.push({id:uid,name:data.name});
             //set data to store
             updateStore([this.locations,this.categories]);
        },

        addNewLocation(data){
            let uid = this.generateID();
            data.id = uid
            this.locations.push(data);
             //set data to store
             updateStore([this.locations,this.categories]);
        },

        getAllCategories(){
            return this.categories;
        },

        getCategoryByID(id){
            return this.categories.filter(f=>f.id === id);
        },

        getLocationByID(id){
            return this.locations.filter(f=>f.id === id);
        },

        getCategoryByName(name){
            return this.categories.filter(f=>f.name === name);
        },

        getAllLocations(){
            return this.locations;
        },

    /*computed values i.e. derived state here*/
  }));
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
export const StoreContext = createContext();
