import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url : '/'
      })
    }),
    getDetails:builder.query({
      query:(id)=>({
        url:`/${id}`
      })
    })
  }),
});

export const {useGetProductQuery,useGetDetailsQuery} = productApi
