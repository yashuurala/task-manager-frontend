import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !completed,
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div>
      <h2 className="mt-4">Tasks</h2>
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks yet!</div>
      ) : (
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? "list-group-item-success" : ""
              }`}
            >
              <div>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <strong>{task.title}</strong>
                </span>
                <br />
                <small className="text-muted">
                  Deadline:{" "}
                  {new Date(task.deadline).toLocaleString([], {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleToggle(task._id, task.completed)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
