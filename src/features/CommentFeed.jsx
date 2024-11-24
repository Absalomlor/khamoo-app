import React from "react";

const CommentFeed = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
};

export default CommentFeed;
