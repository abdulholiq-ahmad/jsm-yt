import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    registerRequest: build.mutation({
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

export const { useLogInRequestMutation, useLogOutRequestMutation, useRegisterRequestMutation } = authApi;
