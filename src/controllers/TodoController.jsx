import React, { useState, useReducer, useContext, useEffect } from "react";
import Todo from "../views/Todo";
import Navbar from "../components/Navbar";

import TaskModel from "../models/TaskModel";

const TodoController = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [editedTask, setEditedTask] = useState(null);

  const addTask = "ADD_TASK";
  const deleteTask = "DELETE_TASK";
  const editTask = "EDIT_TASK";
  const toggleDone = "TOGGLE_DONE";
  const sortTasks = "SORT_TASKS";

  const plannerReducer = (state, action) => {
    switch (action.type) {
      case addTask:
        return [...state, action.payload].sort((a, b) => {
          if (a.priority === b.priority) {
            return state.indexOf(a) - state.indexOf(b);
          } else {
            if (a.priority === "High") return -1;
            if (b.priority === "High") return 1;
            if (a.priority === "Medium") return -1;
            if (b.priority === "Medium") return 1;
            return 0;
          }
        });
      case deleteTask:
        return state.filter((task) => task._id !== action.payload);
      case editTask:
        return state.map((task) =>
          task._id === action.payload.id
            ? { ...task, ...action.payload.updatedTask }
            : task
        );
      case toggleDone:
        return state.map((task) =>
          task._id === action.payload ? { ...task, done: !task.done } : task
        );
      case sortTasks:
        return action.payload;
      default:
        return state;
    }
  };

  const [tasks, dispatch] = useReducer(plannerReducer, []);

  const getTasks = async () => {
    try {
      const taskData = await TaskModel.getTasks();
      return taskData;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const newTask = await TaskModel.createTask({
        title,
        priority,
        userid: id,
      });
      dispatch({ type: addTask, payload: newTask });
      setTitle("");
      setPriority("");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await TaskModel.deleteTaskById(taskId);
      dispatch({ type: deleteTask, payload: taskId });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEdit = async (taskId, updatedTask) => {
    try {
      await TaskModel.editTaskById(taskId, updatedTask);
      dispatch({
        type: editTask,
        payload: { id: taskId, updatedTask },
      });
      setEditedTask(updatedTask);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDone = (taskId) => {
    dispatch({ type: toggleDone, payload: taskId });
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case "title":
        const title = event.target.value;
        setTitle(title);
        break;
      case "priority":
        const priority = event.target.value;
        setPriority(priority);
    }
  };

  return (
    <div>
      <Navbar />
      <Todo
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        handleChange={handleChange}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TodoController;
