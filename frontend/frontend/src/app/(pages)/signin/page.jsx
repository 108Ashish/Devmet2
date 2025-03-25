"use client"
import "../../components/style.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/signIn", {
        username: username,
        password: password,
      });

      console.log(response.data);
      setMessage("Login successful!");
      // Optionally, redirect or store token here
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signin-container">
      <div className="logo-container">
        <Image
          src="/logo.png"
          alt="Logo"
          width={240}
          height={200}
          className="signin-logo"
        />
      </div>

      <div className="signin-box text-white border-purple-500">
        <h1 className="text-black text-3xl font-bold m-auto">Sign In</h1>

        <form className="signin-form" onSubmit={handleLogin}>
          <input
            type="username"
            placeholder="Username"
            className="signin-input"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            Login
          </button>

          {message && <p className="text-red-500 mt-2">{message}</p>}

          <h1 className="text-black mt-4">Don't have an account?</h1>
          <h4 className="s cursor-pointer text-purple-600 font-semibold">
            Sign Up
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Page;
