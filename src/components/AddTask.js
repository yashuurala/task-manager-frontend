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
      // Fix timezone offset before sending
      const localDate = new Date(deadline);
      const offset = localDate.getTimezoneOffset(); // in minutes
      const corrected = new Date(localDate.getTime() - offset * 60000);

      await axios.post(`${API_BASE_URL}/api/tasks`, {
        title,
        deadline: corrected, // ✅ send corrected local datetime
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
