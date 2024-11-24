import React, { useState } from "react";
import PostFeed from "./features/PostFeed";
import CreatePost from "./features/CreatePost";
import SearchPosts from "./features/SearchPosts";
import './App.css';

const App = () => {
  // เก็บข้อมูลโพสต์ใน State
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts
      ? JSON.parse(savedPosts)
      : [
          {
            id: 1,
            title: "Welcome to Social Media App!",
            content: "This is your first post. Add more posts by logging in!",
            likes: 5,
            comments: [{ text: "Great post!", username: "Admin" }],
            username: "Admin",
          },
        ];
  });

  // เก็บข้อมูลผู้ใช้งาน
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : []; // โหลดข้อมูลผู้ใช้จาก localStorage
  });

  // State อื่น ๆ
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // บันทึก Posts ลง localStorage
  const savePostsToLocalStorage = (posts) => {
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  // บันทึก Users ลง localStorage
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // ฟังก์ชันเพิ่มโพสต์
  const addPost = (newPost) => {
    if (!loggedInUser) return;
    const updatedPosts = [
      ...posts,
      { ...newPost, id: Date.now(), likes: 0, comments: [], username: loggedInUser },
    ];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  // ฟังก์ชันสมัครสมาชิก
  const handleSignUp = (username, password) => {
    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers); // บันทึกผู้ใช้ใหม่ลง localStorage
    setIsSignUpOpen(false);
    alert("Sign up successful! You can now log in.");
  };

  // ฟังก์ชันเข้าสู่ระบบ
  const handleLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(user.username);
      setIsLoginOpen(false);
    } else {
      alert("Invalid username or password");
    }
  };

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <div className="container">
      <h1> Kha M<span className="icon">🐽</span>App </h1>

      {/* ระบบ Login/Logout */}
      <div className="login-container">
        {isLoggedIn ? (
          <div>
            <p>Welcome, {loggedInUser}!</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button className="login-button" onClick={() => setIsLoginOpen(true)}>
              Login
            </button>
            <button className="signup-button" onClick={() => setIsSignUpOpen(true)}>
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Popup Sign Up */}
      {isSignUpOpen && (
        <SignUpPopup onSignUp={handleSignUp} onClose={() => setIsSignUpOpen(false)} />
      )}

      {/* Popup Login */}
      {isLoginOpen && (
        <LoginPopup onLogin={handleLogin} onClose={() => setIsLoginOpen(false)} />
      )}

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
          posts={posts.filter(
            (post) =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.content.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          isLoggedIn={isLoggedIn}
          loggedInUser={loggedInUser}
          updatePost={(updatedPost) => {
            const updatedPosts = posts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            );
            setPosts(updatedPosts);
            savePostsToLocalStorage(updatedPosts); // บันทึกโพสต์ที่อัปเดต
          }}
          deletePost={(postId) => {
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
            savePostsToLocalStorage(updatedPosts); // บันทึกโพสต์ที่ลบ
          }}
        />
      </div>
    </div>
  );
};

// Component Sign Up Popup
const SignUpPopup = ({ onSignUp, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Component Login Popup
const LoginPopup = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default App;
