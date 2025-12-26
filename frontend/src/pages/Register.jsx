import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("https://taskmangermern.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful. Please login.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account ✨
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Register as a user
        </p>

        <input
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
