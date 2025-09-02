import React, { useState } from "react";
import axios from "axios";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !deadline) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        deadline, // will include both date + time
      });
      onTaskAdded();
      setTitle("");
      setDeadline("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input
          type="datetime-local"
          className="form-control"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="col-md-2 d-grid">
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;
