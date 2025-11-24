import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const res = await axios.post("/api/users/login", {
        username: username,
        password: password
      })
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.location.replace("/");
      alert("Login successful");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input 
          name="username" 
          value={username} 
          type="text" 
          placeholder="Username" 
          onChange={e => setUsername(e.target.value)} 
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input 
          name="password" 
          value={password} 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
      >
        Login
      </button>
    </form>
  );
}