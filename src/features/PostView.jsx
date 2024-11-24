import React, { useState } from "react";
import CommentFeed from "./CommentFeed";
import AddComment from "./AddComment";
import LikeAction from "./LikeAction";

const PostView = ({ post, isLoggedIn, updatePost, deletePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    updatePost(editedPost);
    setIsEditing(false);
  };

  return (
    <div className="post">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <textarea
            value={editedPost.content}
            onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
          ></textarea>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <LikeAction post={post} updatePost={updatePost} />

          {/* สิทธิ์แก้ไขและลบโพสต์ (เฉพาะผู้ใช้ล็อกอิน) */}
          {isLoggedIn && (
            <div className="post-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          )}

          {/* คอมเมนต์ */}
          <CommentFeed comments={post.comments} />
          {isLoggedIn && (
            <AddComment
              addComment={(newComment) =>
                updatePost({
                  ...post,
                  comments: [...post.comments, newComment],
                })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostView;
