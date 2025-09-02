import React, { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">Cloud Task Manager</h1>
        <AddTask onTaskAdded={handleTaskAdded} />
        <hr />
        <TaskList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
