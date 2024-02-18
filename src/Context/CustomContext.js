import React, { createContext , useContext , useEffect, useReducer, useState } from 'react';
import axios from'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reducer , filterReducer } from '../Reducer/Reducers';
const customContext = createContext();
//custom hook for custom context
const useContextValue=()=>{
    const context = useContext(customContext);
    return context;
}
function CustomContext({children}) {
    const [state, dispatch] = useReducer(reducer, {products: [] , cart: {} , total: 0 , category: [] , user: null , loading: false , orders:[]});
    const [userData,setUserData]=useState(JSON.parse(localStorage.getItem("token")));
    const [filterState , filterDispatch] = useReducer(filterReducer , {price: 1000, category: [] , searchQuery: ''});
    const signout=()=>{
        localStorage.removeItem("token");
        setUserData(null);
    }
    //signin funtion
    useEffect(()=>{
        if(userData){
            fetchProducts()
            fetchcartProducts()
        }
    })
    const signIn = async(data)=>{
        dispatch({type: 'SET_DATA' , payload: {state: 'loading' , value: true}});
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          }
          const userCredential = await axios.post(
            "https://dummyjson.com/auth/login",
            { username:data.username, password:data.password },
            config
          );
            const currentUser = {
                displayName: userCredential.data.firstName,
                email: userCredential.data.email,
                photoURL: userCredential.data.image,
                userId: userCredential.data.id,
                token:userCredential.data.token
            }
            localStorage.setItem("token",JSON.stringify(currentUser));
            setUserData(JSON.parse(localStorage.getItem("token")));
            dispatch({
                type: 'SET_DATA' , 
                payload:{
                  state: 'user',
                  value: currentUser
                }});
            dispatch({type: 'SET_DATA' , payload: {state: 'loading' , value: false}});
    }
    const setFilterQuery = (query)=>{
        if(typeof query === 'object' && query.type === 'category'){
            filterDispatch({
                type: "SET_CATEGORY",
                payload: query.selectedCategory
            })
        }
        if(typeof query === 'string'){
            filterDispatch({
                type: "SET_SEARCHQUERY",
                payload: query
            })
        }

        if(typeof query === 'number'){
            filterDispatch({
                type: "SET_PRICE",
                payload: query
            })
        }
    }
    const transformedProducts = ()=>{
        let { price , category , searchQuery} = filterState;
        let filteredProducts = [...state.products];
        if(price){
            filteredProducts = filteredProducts.filter((el)=> Number(el.price) <= filterState.price);
        }
        if(category.length > 0){
            let temp = filterState.category.map((cat)=>{
                let tempProds = filteredProducts.filter((el)=> el.category === cat);
                return tempProds;
            })
            filteredProducts = temp.flat();
        }
        if(searchQuery){
            filteredProducts = filteredProducts.filter((el)=> el.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return filteredProducts;
    }

    //fecth products from api
    const fetchProducts = async()=>{
        const res = await axios.get('https://dummyjson.com/products');
        dispatch({
            type: 'SET_DATA',
            payload: {
                state: 'products',
                value: res.data.products
            }
        })
    };

    //fetch cart products from API
    const fetchcartProducts = async()=>{
        if(Object.keys(state.cart).length>0) return; 
        try{
            const cart = await axios.get(`https://dummyjson.com/carts/user/${userData.userId}`);
            const changedcart=cart.data.carts[0];
            changedcart.in_cart=true;
            dispatch({
                type: 'SET_DATA',
                payload: {
                    state: 'cart',
                    value: changedcart
                }
            });
        }catch(error){
            console.log(error)
        }
    };
   const updateCart=async(id,quantity,index)=>{
             if(quantity===-1) return;
             let temp1=[];
             temp1=state.cart.products;
             if(index!==-1){
                 temp1[index].id=id;
                 temp1[index].quantity=quantity;
             }
             else{
                temp1.push({id,quantity});
             }
             try{
                const updatedCart=await axios.put(`https://dummyjson.com/carts/${state.cart.id}`,{
                    merge: true, // this will include existing products in the cart
                    products:temp1
                 },{
                    headers: {
                      'Content-Type': 'application/json',
                    }})
                    dispatch({
                        type: 'SET_DATA',
                        payload: {
                            state: 'cart',
                            value: updatedCart.data
                        }
                    });
                    console.log(updatedCart.data);
             }catch(error){
                console.log(error);
             }
   }
   const getUniqueData = (itemArray , property)=>{
    let data = itemArray.map((item)=>{
        return item[property];
    })
    data = [...new Set(data)];
    dispatch({
        type: 'SET_DATA',
        payload: {
            state: property,
            value: data
        }
    })
}
  return (
    <customContext.Provider value={{
        products: state.products,
        setUserData,
        getUniqueData,
        userData,
        signout,
        fetchProducts,
        cart: state.cart,
        toast,
        category: state.category,
        setFilterQuery,
        user: state.user,
        loading: state.loading,
        signIn,
        fetchcartProducts,
        price: filterState.price,
        transformedProducts,
        updateCart
    }}>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
      />
        {children}
    </customContext.Provider>
  )
}

export default CustomContext;
export {useContextValue};