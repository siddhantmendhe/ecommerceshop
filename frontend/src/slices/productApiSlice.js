import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => ({url:PRODUCTS_URL}),
        keepUnusedDataFor:5
      }),
      getProductDetails: builder.query({
        query:(productId)=>({
          url:`${PRODUCTS_URL}/${productId}`}),
          keepUnusedDataFor:5
      }),
      createProduct: builder.mutation({
        query:()=>({
          url:PRODUCTS_URL,
          method:'POST',
        })
      }),
      editProduct: builder.mutation({
        query: ({data})=>({
          url:`${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data
        })
      }),
      uploadProductImage: builder.mutation({
        query:(data)=>({
          url:UPLOAD_URL,
          method:'POST',
          body: data,

        })
      })
    }),
    
  })
  
  export const {useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation, useEditProductMutation, useUploadProductImageMutation}=productsApiSlice;