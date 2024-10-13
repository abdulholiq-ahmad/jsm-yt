import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    checkUser: build.query({
      query: () => ({
        url: "/auth/access",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
    logInRequest: build.mutation({
      query: (body: object) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Response data:", data);
          localStorage.setItem("token", data?.accessToken || "");
        } catch (error) {
          console.error("Failed to save token:", error);
        }
      },
    }),
    resgiterRequest: build.mutation({
      query: (body: object) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Response data:", data);
          localStorage.setItem("token", data?.accessToken || "");
        } catch (error) {
          console.error("Failed to save token:", error);
        }
      },
    }),

    logOutRequest: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLogInRequestMutation, useLogOutRequestMutation, useCheckUserQuery } = authApi;
