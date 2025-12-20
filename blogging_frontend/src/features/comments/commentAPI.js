import API from "../../api/axios";

// Get all comments
export const getComments = async (postId) => {
  const res = await API.get(`/posts/${postId}/comments`);
  return res.data;
};

// Add comment (returns ONE comment)
export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comments`, { text });
  return res.data;
};

// Delete comment (returns deleted id)
export const deleteComment = async (postId, commentId) => {
  const res = await API.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
};
