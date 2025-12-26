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
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(await res.json());
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/auth/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(await res.json());
  };

  const createTask = async () => {
    await fetch("http://localhost:5000/api/tasks/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, userEmail })


    });

    setTitle("");
    setDescription("");
    setUserId("");
    fetchTasks();
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Admin Dashboard <span className="text-yellow-400">(Admin)</span>
        </h2>
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded  mb-6">
        <h3 className="font-semibold mb-2">Create Task</h3>

        <input
          className="w-full p-2 mb-2 text-white"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 mb-2 text-white"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
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
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task._id} className="bg-gray-800 p-4 rounded">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-gray-300">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
