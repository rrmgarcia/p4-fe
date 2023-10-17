import styles from "../styles/Todo.module.css";

const TodoForm = (props) => {
  const {
    title,
    setTitle,
    tasks,
    priority,
    setPriority,
    handleChange,
    editedTask,
    setEditedTask,
    handleEdit,
    handleDelete,
    handleDone,
    handleSubmit,
  } = props;

  return (
    <div>
      <div>
        <h2>What to do??</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add task here..."
            id="title"
            value={title}
            onChange={handleChange}
          ></input>
          <select id="priority" value={priority} onChange={handleChange}>
            <option value={null}>Set Priority...</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div>
        <h2>Things to do:</h2>
        {tasks.map((item) => (
          <div id={styles.taskList} key={item._id}>
            <p>Task:</p>
            {item._id === editedTask ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : item.done ? (
              <p style={{ textDecoration: "line-through" }}>{item.title}</p>
            ) : (
              <p>{item.title}</p>
            )}
            <p>Priority:</p>
            {item._id === editedTask ? (
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            ) : item.done ? (
              <p style={{ textDecoration: "line-through" }}>{item.priority}</p>
            ) : (
              <p>{item.priority}</p>
            )}
            {!item.done ? (
              <div>
                {item._id === editedTask ? (
                  <button
                    onClick={() => handleEdit(item._id, { title, priority })}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.actionButton}
                    onClick={() => setEditedTask(item._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
            <button onClick={() => handleDone(item._id)}>Done</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoForm;
