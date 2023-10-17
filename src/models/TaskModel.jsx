class TaskModel {
  constructor() {}

  async getTasks() {
    try {
      const response = await fetch("https://p4-be.onrender.com/todo", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
      
    }
  }

  async createTask(title) {
    try {
      const response = await fetch("https://p4-be.onrender.com/todo", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(title),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (response) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteTaskById(taskId) {
    try {
      const response = await fetch(`https://p4-be.onrender.com/todo/${taskId}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async editTaskById(taskId, updatedTask) {
    try {
      const response = await fetch(`https://p4-be.onrender.com/todo/${taskId}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(updatedTask),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const model = new TaskModel();
export default model;
