import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:3000/api/v1/course";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category },
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;

