import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      setMessage("Invalid username or password!");
      return;
    }

    setCurrentUser(user);
    setMessage("Login successful!");
    setTimeout(() => {
      navigate("/"); // นำผู้ใช้กลับไปหน้า Home
    }, 2000);
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
