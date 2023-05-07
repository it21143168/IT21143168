import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/postApi';
import {
  likePost,
  unlikePost,
  addComment,
  updateComment,
  deleteComment,
} from '../api/statusApi';
import PostsList from '../components/post/PostsList';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  const handleLike = async (postId) => {
    await likePost(postId, /userId/);
    // Update the state with

    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post,
    );
    setPosts(updatedPosts);
  };

  const handleUnlike = async (postId) => {
    await unlikePost(postId, /userId/);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes - 1 } : post,
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = async (postId, commentData) => {
    const newComment = await addComment(postId, commentData);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post,
    );
    setPosts(updatedPosts);
  };

  const handleUpdateComment = async (postId, commentId, updatedData) => {
    await updateComment(postId, commentId, updatedData);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId ? { ...comment, ...updatedData } : comment,
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter((comment) => comment.id !== commentId);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="post-page">
      <PostsList
        posts={posts}
        onLike={handleLike}
        onUnlike={handleUnlike}
        onAddComment={handleAddComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default PostPage;