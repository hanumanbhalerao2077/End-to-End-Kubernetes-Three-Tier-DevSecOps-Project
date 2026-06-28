import React, { useEffect, useState } from "react";
import { Paper, TextField, Checkbox, Button, CircularProgress } from "@mui/material";
import { addTask, getTasks, updateTask, deleteTask } from "./services/taskServices";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Unable to load tasks right now.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskText = currentTask.trim();

    if (!taskText) {
      setError("Please enter a task before submitting.");
      return;
    }

    try {
      const { data } = await addTask({ task: taskText });
      setTasks([data, ...tasks]);
      setCurrentTask("");
      setError("");
    } catch (err) {
      setError("The task could not be created.");
      console.error(err);
    }
  };

  const handleUpdate = async (taskId) => {
    const currentTaskItem = tasks.find((task) => task._id === taskId);
    if (!currentTaskItem) return;

    const updatedCompleted = !currentTaskItem.completed;

    try {
      await updateTask(taskId, { completed: updatedCompleted });
      setTasks((previousTasks) =>
        previousTasks.map((task) => (task._id === taskId ? { ...task, completed: updatedCompleted } : task))
      );
      setError("");
    } catch (err) {
      setError("The task could not be updated.");
      console.error(err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((previousTasks) => previousTasks.filter((task) => task._id !== taskId));
      setError("");
    } catch (err) {
      setError("The task could not be deleted.");
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Production Todo Board</h1>
      </header>
      <div className="main-content">
        <Paper elevation={3} className="todo-container">
          <form onSubmit={handleSubmit} className="task-form">
            <TextField
              variant="outlined"
              size="small"
              className="task-input"
              value={currentTask}
              required
              onChange={({ target }) => setCurrentTask(target.value)}
              placeholder="Add a new task"
            />
            <Button className="add-task-btn" color="primary" variant="outlined" type="submit">
              Add Task
            </Button>
          </form>

          {error && <p className="form-error">{error}</p>}

          {loading ? (
            <div className="loading-state">
              <CircularProgress />
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.length === 0 ? (
                <p className="empty-state">No tasks yet. Add one to get started.</p>
              ) : (
                tasks.map((task) => (
                  <Paper key={task._id} className="task-item">
                    <Checkbox
                      checked={Boolean(task.completed)}
                      onChange={() => handleUpdate(task._id)}
                      color="primary"
                    />
                    <div className={task.completed ? "task-text completed" : "task-text"}>{task.task}</div>
                    <Button onClick={() => handleDelete(task._id)} color="secondary" className="delete-task-btn">
                      Delete
                    </Button>
                  </Paper>
                ))
              )}
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Tasks;
