import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("https://taskmangermern.onrender.com/api/tasks/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(await res.json());
  };

  const fetchUsers = async () => {
    const res = await fetch("https://taskmangermern.onrender.com/api/auth/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(await res.json());
  };

  const createTask = async () => {
    await fetch("https://taskmangermern.onrender.com/api/tasks/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, userEmail })
    });

    setTitle("");
    setDescription("");
    setUserEmail("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Admin Dashboard <span className="text-indigo-400">(Admin)</span>
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">Total Tasks</p>
          <h2 className="text-3xl font-bold text-indigo-400">{tasks.length}</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-3xl font-bold text-green-400">{completed}</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">{pending}</h2>
        </div>
      </div>
      <div className="bg-gray-800 p-5 rounded-xl mb-6">
        <h3 className="font-semibold mb-3">Create Task</h3>
        <input
          className="w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        >
          <option value="">Assign to user</option>
          {users.map(u => (
            <option key={u.email} value={u.email}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
        <button
          onClick={createTask}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500"
          >
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-gray-400 text-sm">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
