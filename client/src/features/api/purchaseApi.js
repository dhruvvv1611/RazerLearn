import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/v1/purchase";
export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include", // Ensures cookies/session data are sent with the request
  }),
  endpoints: (builder) => ({
    // Mutation to create a course purchase record
    createCoursePurchase: builder.mutation({
      query: ({ courseId }) => ({
        url: "/purchase", // Adjusted to your new non-Stripe endpoint
        method: "POST",
        body: { courseId },
      }),
    }),
    // Mutation to mark a course purchase as completed
    completeCoursePurchase: builder.mutation({
      query: ({ purchaseId }) => ({
        url: "/purchase/complete", // Endpoint for completing a purchase
        method: "POST",
        body: { purchaseId },
      }),
    }),
    // Query to fetch all purchased courses
    fetchPurchasedCourses: builder.query({
      query: () => ({
        url: "/", // Fetch all completed course purchases
        method: "GET",
      }),
    }),
    // Query to fetch course details with purchase status
    fetchCourseDetailWithStatus: builder.query({
      query: ({ courseId }) => ({
        url: `/course/${courseId}/detail-with-status`, // Fetch details for a specific course
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCoursePurchaseMutation,
  useCompleteCoursePurchaseMutation,
  useFetchPurchasedCoursesQuery,
  useFetchCourseDetailWithStatusQuery,
} = purchaseApi;
