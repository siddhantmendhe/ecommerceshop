import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
            url:`${USER_URL}/auth`,
            method:'POST',
            body:data
        })
       
     
      }),
      logoutApi: builder.mutation({
        query:()=>({
          url:`${USER_URL}/logout`,
          method:'POST',

        })
      }),
      registerUser: builder.mutation({
        query:(data)=>({
          url:`${USER_URL}`,
          method:'POST',
          body:data
        })
      })
     
    }),
    
  })
  
  export const {useLoginMutation, useLogoutApiMutation, useRegisterUserMutation}=userApiSlice;