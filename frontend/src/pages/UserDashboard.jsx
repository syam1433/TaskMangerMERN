import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("active");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetch("https://taskmangermern.onrender.com/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setUser);

    fetch("https://taskmangermern.onrender.com/api/tasks/user", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setTasks);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredTasks = tasks.filter(t => {
    if (tab === "completed") return t.completed;
    if (tab === "overdue") return t.overdue;
    return !t.completed;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <span className="ml-4 text-sm text-blue-600">
            {tasks.filter(t => t.completed).length}/{tasks.length} Tasks Completed
          </span>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-6 mb-6 border-b">
        {["active", "completed", "overdue"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 capitalize ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded-xl shadow relative">

            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              Active
            </span>

            <h3 className="font-semibold mt-2">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>Due: Jan 25, 2026</span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                High Priority
              </span>
            </div>
            <div className="absolute top-4 right-4 w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
