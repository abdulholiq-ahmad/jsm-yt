import { api } from "../api";

const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    toggleLike: build.mutation({
      query: ({ id }) => ({
        url: `api/post/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useToggleLikeMutation } = postApi;
