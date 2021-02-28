import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return ( //how to return a list of states (tasks in this case) in react -- map
    <>
      {tasks.map((task) => (// map each array element into a JSX virtual DOM element
        <Task
          key={task.id}    // each list element must have a unique id
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
