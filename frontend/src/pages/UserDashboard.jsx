import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://taskmangermern.onrender.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setUser);

    fetch("https://taskmangermern.onrender.com/api/tasks/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
     
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow"
        >
          🔓 Logout
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned to you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg mb-1">
                {task.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {task.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
