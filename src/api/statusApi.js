import axios from 'axios';
import apiConfig from '../config/apiConfig';

const statusApi = axios.create({
  baseURL: `${apiConfig.baseURL}/status`,
});

export const likePost = async (postId, userId) => {
  const response = await statusApi.post(`/${postId}/like`, { userId });
  return response.data;
};

export const unlikePost = async (postId, userId) => {
  const response = await statusApi.post(`/${postId}/unlike`, { userId });
  return response.data;
};

export const addComment = async (postId, commentData) => {
  const response = await statusApi.post(`/${postId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (postId, commentId, updatedData) => {
  const response = await statusApi.put(`/${postId}/comments/${commentId}`, updatedData);
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await statusApi.delete(`/${postId}/comments/${commentId}`);
  return response.data;
};