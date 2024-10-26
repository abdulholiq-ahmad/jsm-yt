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
  }),
});

export const { useGetSingleProfileQuery } = postApi;
