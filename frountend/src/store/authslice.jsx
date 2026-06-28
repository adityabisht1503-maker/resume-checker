import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";
const token = localStorage.getItem('token')
const user=localStorage.getItem("user")
const Plan=localStorage.getItem("Plan")
let isLoggedIn;
if(token){
  isLoggedIn=true
}else{
  isLoggedIn=false  
}
let userdata;

  if (user){
    userdata=JSON.parse(user)
  } 
    else{
            userdata=null
    } 
  

const initialState={
isLoggedIn:isLoggedIn,
user:userdata,
plan:Plan
}
console.log(Plan);

const authslice = createSlice({
  name:'auth',
  initialState,
  reducers:{
      login: (state, action) => {
      state.isLoggedIn = true;
       state.user = action.payload.user; 
      state.plan = action.payload.plan;
      
  },
   logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
       state.plan = null;
    },
  },
})
export const { login, logout } = authslice.actions;
export default authslice
