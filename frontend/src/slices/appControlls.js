import { createSlice } from "@reduxjs/toolkit";


export const appControlls = createSlice({
    name: 'controls',
    initialState:{search:''},
    reducers: {
      updateSearch: (state,action) => {
     
        state.search= action.payload;
      },

    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateSearch } = appControlls.actions
  
  export default appControlls.reducer
