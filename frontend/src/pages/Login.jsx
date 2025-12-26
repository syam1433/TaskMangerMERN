import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://taskmangermern.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.token) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("token", data.token);
    data.role === "admin" ? navigate("/admin") : navigate("/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        <input
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
        New user?{" "}
        <a href="/register" className="text-indigo-600 font-semibold">
            Create account
        </a>
        </p>

      </div>
    </div>
  );
}
