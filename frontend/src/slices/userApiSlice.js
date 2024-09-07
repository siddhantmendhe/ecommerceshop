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
      }),
      profileUpdate:builder.mutation({
        query:(data)=>({
          url:`${USER_URL}/profile`,
          method:'PUT',
          body: data,

        })
      }),
      getAllUsers: builder.query({
        query:()=>({
          url:USER_URL,
        }),
        providesTags:['users'],
        keepUnusedDataFor:5,
      }),
      deleteUser: builder.mutation({
        query:(userId)=>({
          url:`${USER_URL}/${userId}`,
          method:'DELETE',
        }),
        invalidatesTags:['users'],
      }),
      getUserById: builder.query({
        query:(userId)=>({
          url:`${USER_URL}/${userId}`,
        }),
        providesTags:['user'],
        keepUnusedDataFor: 5
      }),
      updateUser:builder.mutation({
        query:(data)=>({
          url:`${USER_URL}/${data.userId}`,
          method:'PUT',
          body:data,
        }),
        invalidatesTags:['user','users']
      })
     
    }),
    
  })
  
  export const {useLoginMutation, useLogoutApiMutation, useRegisterUserMutation, useProfileUpdateMutation, useGetAllUsersQuery, useDeleteUserMutation, useGetUserByIdQuery, useUpdateUserMutation}=userApiSlice;