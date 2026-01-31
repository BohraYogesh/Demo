import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../api/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/admin/login", {
      username: username.trim(),
      password: password.trim(),
    });

    // console.log("RESPONSE:", res);

    if (res.status === 200 && res.data.token) {
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl max-w-sm w-full shadow-xl">
        <h2 className="text-2xl text-pink-700 font-semibold mb-4 text-center"
        style={{color: "#3B240C",fontFamily: "'Dancing Script', cursive",
              fontWeight: "bold",}}>
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Username */}
        <input
          className="w-full mb-4 p-3 rounded-xl bg-transparent border border-white/40 text-gray-800 outline-none"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password + Eye Icon (same row) */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 pr-12 rounded-xl bg-transparent border border-white/40 text-gray-800 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#6E1616", color: "#E8D3A8" }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
