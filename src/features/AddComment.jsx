import React, { useState } from "react";

const AddComment = ({ addComment, loggedInUser }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ text: comment, username: loggedInUser });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default AddComment;
