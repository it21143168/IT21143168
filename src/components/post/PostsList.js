import React from 'react';
import Post from './Post';

const PostsList = ({ posts, onLike, onUnlike, onAddComment, onUpdateComment, onDeleteComment }) => {
  return (
    <div className="posts-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={onLike}
          onUnlike={onUnlike}
          onAddComment={onAddComment}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default PostsList;