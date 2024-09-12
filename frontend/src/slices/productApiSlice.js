import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => ({url:PRODUCTS_URL}),
        keepUnusedDataFor:5,
        providesTags:['products']
      }),
      getProductDetails: builder.query({
        query:(productId)=>({
          url:`${PRODUCTS_URL}/${productId}`}),
          keepUnusedDataFor:5,
          providesTags:['product']
      }),
      createProduct: builder.mutation({
        query:()=>({
          url:PRODUCTS_URL,
          method:'POST',
        }),
        invalidatesTags:['products']
      }),
      editProduct: builder.mutation({
        query: ({data})=>({
          url:`${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data
        }),
        invalidatesTags:['products']

      }),
      uploadProductImage: builder.mutation({
        query:(data)=>({
          url:UPLOAD_URL,
          method:'POST',
          body: data,

        })
      }),
      deleteProduct: builder.mutation({
        query:(productId)=>({
          url: `${PRODUCTS_URL}/${productId}`,
          method:'DELETE',
          
        }),
        invalidatesTags:['products']
      }),
      createProductReview: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}/reviews`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags:['product','products']
      })
    }),
    
  })
  
  export const {useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation, useEditProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateProductReviewMutation}=productsApiSlice;