import { createSlice } from "@reduxjs/toolkit";
const initialState=localStorage.getItem('search')?JSON.parse(localStorage.getItem('search')) :{search:''}

export const appControlls = createSlice({
    name: 'controls',
    initialState,
    reducers: {
      updateSearch: (state,action) => {
     
        state.search= action.payload;
        localStorage.setItem('search',JSON.stringify(state))
      },

    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateSearch } = appControlls.actions
  
  export default appControlls.reducer
