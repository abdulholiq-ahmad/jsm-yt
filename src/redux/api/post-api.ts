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
    postComment: build.mutation({
      query: ({ id, body }) => ({
        url: `api/comment/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useToggleLikeMutation, usePostCommentMutation } = postApi;
