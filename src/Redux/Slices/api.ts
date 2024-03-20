import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // Change the URL to match your backend endpoint
  endpoints: (builder) => ({
    getAllProducts: builder.query<[], void>({
      query: () => '/products', // Change '/products' to match your backend endpoint to fetch all products
    }),
    submitForm: builder.mutation<void, any>({
      query: (formData) => ({
        url: "/submitForm",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
 
export const {
  useGetAllProductsQuery,
  useSubmitFormMutation,
} = api;
 
export default api;