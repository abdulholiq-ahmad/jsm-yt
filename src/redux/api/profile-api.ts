import { api } from "../api";

const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleProfile: build.query({
      query: ({ username }) => ({
        url: `api/user/profile/${username}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getAllPosts: build.query({
      query: ({ username }) => ({
        url: `api/post/${username}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetSingleProfileQuery, useGetAllPostsQuery } = postApi;
