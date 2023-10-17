class UserModel {
  constructor() {}

  async getUsers() {
    try {
      const response = await fetch("https://p4-be.onrender.com/auth/signin");
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Unauthorized access");
    } else if (!response?.ok) {
      throw new Error("Failed to get users");
    }
  }

  async createUser(user) {
    try {
      const response = await fetch("https://p4-be.onrender.com/user/register", {
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
        body: JSON.stringify(user),
      });
      if (response.status === 401) {
        console.log(response);
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response?.ok) {
        throw new Error("Failed to get users");
      } else {
        console.log(response);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(username, password) {
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("https://p4-be.onrender.com/auth/signin", {
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
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        const data = await response.text();
        return data;
      } else if (response.status === 401) {
        throw new Error("Invalid username or password.");
      } else {
        throw new Error(
          "Failed to login. Server responded with status: " + response.status
        );
      }
    } catch (err) {
      throw new Error("Failed to login." + err.message);
    }
  }
}
const model = new UserModel();
export default model;
