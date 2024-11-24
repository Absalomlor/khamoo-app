import React from "react";

const CommentFeed = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <p key={index}>
          <strong>{comment.username || "Anonymous"}:</strong> {comment.text}
        </p>
      ))}
    </div>
  );
};

export default CommentFeed;
