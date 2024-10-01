import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const placeholderApi = createApi({
  reducerPath: "placeholderApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    
    getPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      })
    }),

    createPost: builder.mutation({
      query: ({ ...newPost }) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      })
    })
  })
});

export const { useGetPostsQuery, useCreatePostMutation } = placeholderApi;
