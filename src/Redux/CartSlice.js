"use client";
import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state, action)=>{
            state.push(action.payload);
        },
        removeFromCart:(state, action)=>{
            return state.filter((item)=>item.id!==action.payload);
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.find((item) => item.id === itemId);
      
            if (item) {
              // If the item is already in the cart, increment its quantity
              item.quantity += 1;
            }
          },
          updateQuantity: (state, action) => {
            const { itemId, newQuantity } = action.payload;
            const item = state.find((item) => item.id === itemId);
      
            if (item) {
              // If the item is in the cart, update its quantity to the new value
              item.quantity = newQuantity;
            }
          },
          pageName:(state,action)=>{
            state.pageName=action.payload;  
          }    
    },
});
export const { addToCart, removeFromCart,incrementQuantity,updateQuantity,pageName }=cartSlice.actions;
export default cartSlice.reducer;