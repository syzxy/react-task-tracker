import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  // Hook states to UIs
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch all data from server -- a "json server" is used here
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    return data;
  };

  // Fetch single data entity
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  // Delete task
  const deleteTask = async (taskID) => {
    // Delete on server
    await fetch(`http://localhost:5000/tasks/${taskID}`, { method: "DELETE" });

    // Modify the UI
    setTasks(tasks.filter((task) => taskID !== task.id));
  };

  // Toggle reminder
  const toggleReminder = async (taskID) => {
    const taskToUpdate = await fetchTask(taskID);
    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };
    const response = await fetch(`http://localhost:5000/tasks/${taskID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    setTasks(
      tasks.map((task) =>
        task.id === taskID ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Add task
  const addTask = async (task) => {
    // Post new task on server and get the inserted data back
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();

    // Update UI
    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        {/* react passes all JSX attribute and children to this
      user-defined component as a single object called "props" */}
        <Header
          title="Task Tracker"
          onToggleAddTask={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}

              {/* ternary operation used to return different element according to the length of tasks */}
              {tasks.length ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No task to show."
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
