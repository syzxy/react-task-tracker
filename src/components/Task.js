import { FaTimes } from "react-icons/fa"; // fontAwsome 'x'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task${task.reminder ? " reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >

      <h3>
        {task.text}
        <FaTimes
          style={{ color: "darkred" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>

      <p>{task.day}</p>

    </div>
  );
};

export default Task;
