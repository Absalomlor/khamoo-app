import React from "react";
import PostView from "./PostView";

const PostFeed = ({ posts, isLoggedIn, loggedInUser, updatePost, deletePost }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available. Login to add your first post!</p>
      ) : (
        posts.map((post) => (
          <PostView
            key={post.id}
            post={post}
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
            updatePost={updatePost}
            deletePost={deletePost}
          />
        ))
      )}
    </div>
  );
};

export default PostFeed;
