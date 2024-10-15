import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/api/user/all",
        params,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = authApi;
