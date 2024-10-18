import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (params) => ({
        url: "/api/user/profile",
        params,
      }),
    }),
    getUsers: build.query({
      query: (params) => ({
        url: "/api/user/all",
        params,
      }),
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    unFollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getFeed: build.query({
      query: ({ limit = 10 }) => ({
        url: `/api/user/feed?limit=${limit}`,
        method: "GET",
      }),
    }),
    setPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useFollowMutation,
  useUnFollowMutation,
  useGetProfileQuery,
  useGetFeedQuery,
  useSetPostMutation,
} = authApi;
