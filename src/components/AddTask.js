import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ import the base URL

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
      // Parse datetime-local string manually (treat as local)
      const [datePart, timePart] = deadline.split("T");
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, minute] = timePart.split(":").map(Number);

      // Construct a Date in local timezone (not UTC)
      const corrected = new Date(year, month - 1, day, hour, minute);

      await axios.post(`${API_BASE_URL}/api/tasks`, {
        title,
        deadline: corrected, // ✅ send properly constructed local datetime
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
