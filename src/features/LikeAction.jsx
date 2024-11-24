import React from "react";
import './LikeButton.css';

const LikeAction = ({ post, updatePost }) => {
  const handleLike = () => {
    updatePost({ ...post, likes: post.likes + 1 });
  };

  return (
    <button className="like-button" onClick={handleLike}>
      <span className="like-icon">🍖</span>
      Like
      <span className="like-count">({post.likes})</span>
    </button>
  );
};

export default LikeAction;
