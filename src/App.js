import React, { useState, useEffect } from "react";
import PostFeed from "./features/PostFeed";
import CreatePost from "./features/CreatePost";
import SearchPosts from "./features/SearchPosts";

const App = () => {
  // โหลดโพสต์จาก LocalStorage หรือใช้โพสต์ตัวอย่างถ้าไม่มี
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [
      {
        id: 1,
        title: "Welcome to Social Media App!",
        content: "This is your first post. Add more posts by logging in!",
        likes: 5,
        comments: ["Great post!", "Very useful app!"],
      },
      {
        id: 2,
        title: "React is Awesome!",
        content: "React makes it easy to build interactive user interfaces.",
        likes: 8,
        comments: ["I totally agree!", "React rocks!"],
      },
    ];
  });

  const [searchQuery, setSearchQuery] = useState(""); // คำค้นหา
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะล็อกอิน

  // ฟังก์ชันสำหรับบันทึกโพสต์ลงใน LocalStorage
  const savePostsToLocalStorage = (posts) => {
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  // เพิ่มโพสต์ใหม่
  const addPost = (newPost) => {
    const updatedPosts = [...posts, { ...newPost, id: Date.now(), likes: 0, comments: [] }];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  // แก้ไขโพสต์
  const updatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  // ลบโพสต์
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  // ค้นหาโพสต์
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // จัดการการล็อกอิน/ออก
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="container">
      <h1>Social Media App</h1>

      {/* ระบบ Login/Logout */}
      <div className="login-container">
        {isLoggedIn ? (
          <div>
            <p>Welcome, User!</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>

      {/* ค้นหาโพสต์ */}
      <div className="search-bar">
        <SearchPosts setSearchQuery={setSearchQuery} />
      </div>

      {/* ฟอร์มเพิ่มโพสต์ (เฉพาะผู้ใช้ที่ล็อกอิน) */}
      {isLoggedIn && (
        <div className="create-post-container">
          <CreatePost addPost={addPost} />
        </div>
      )}

      {/* แสดงฟีดโพสต์ */}
      <div className="post-feed-container">
        <PostFeed
          posts={filteredPosts}
          isLoggedIn={isLoggedIn}
          updatePost={updatePost}
          deletePost={deletePost}
        />
      </div>
    </div>
  );
};

export default App;
