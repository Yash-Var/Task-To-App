import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [notification, setNotification] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div>
        <form className="FormWrapper" onSubmit={handleSubmit}>
          <h3>Task Manager</h3>
          <div className="form-control">
            <input
              type="text"
              name="input-box"
              id="input-box"
              placeholder="Enter your task"
              value={task}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <input type="submit" value="Submit" id="submit-btn" />
          </div>
          {notification && (
            <div id="notify" className="notification notification-visible">
              <i className="fa-solid fa-circle-check"></i>
              <p>Successfully Added</p>
            </div>
          )}
        </form>
        <section className="tasks-container">
          {tasks.length === 0 ? (
            <h3 className="empty-task">No Task Available</h3>
          ) : (
            <div className="tasks">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`single-task ${task.completed ? "completed" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                  />
                  <p className="text">{task.text}</p>
                  <div className="icon">
                    <i
                      className="fa-solid fa-trash fa-shake delete"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
