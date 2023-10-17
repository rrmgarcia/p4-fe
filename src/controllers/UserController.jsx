import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RegistrationForm from "../views/RegistrationForm";

import UserModel from "../models/UserModel";

const UserController = () => {
  const navigate = useNavigate();

  const [currentUsers, setCurrentUsers] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passDoesNotMatchError, setPassDoesNotMatchError] = useState(false);
  const [requireFields, setRequiredFields] = useState(false);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        const email = event.target.value;
        setUserData({ ...userData, email: email });
        if (email.length === 0 && !emailError) {
          setEmailError(true);
        } else if (usernameError) {
          setEmailError(false);
        }
        break;
      case "username":
        const username = event.target.value;
        setUserData({ ...userData, username: username });
        if (username.length === 0 && !usernameError) {
          setUsernameError(true);
        } else if (usernameError) {
          setUsernameError(false);
        }
        break;
      case "password":
        const password = event.target.value;
        setUserData({ ...userData, password: password });
        if (password.length === 0 && !passwordError) {
          setPasswordError(true);
        } else if (passwordError) {
          setPasswordError(false);
        }
        break;
      case "confirmPassword":
        const confirmPassword = event.target.value;
        setUserData({ ...userData, confirmPassword: confirmPassword });
        if (confirmPassword.length === 0 && !confirmPasswordError) {
          setConfirmPasswordError(true);
        } else if (passwordError) {
          setConfirmPasswordError(false);
        }
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !userData.email ||
      !userData.username ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setRequiredFields(true);
    } else if (userData.password !== userData.confirmPassword) {
      setPassDoesNotMatchError(true);
    } else {
      const newUser = await UserModel.createUser({ ...userData });
      setCurrentUsers([...currentUsers, newUser]);
      setRequiredFields(false);
      setPassDoesNotMatchError(false);
      setTimeout(() => {
        alert("Congratulations! You are now registered!");
      }, 500);
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  };
  return (
    <div>
      <RegistrationForm
        email={userData.email}
        username={userData.username}
        password={userData.password}
        confirmPassword={userData.confirmPassword}
        emailError={emailError}
        usernameError={usernameError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        passDoesNotMatchError={passDoesNotMatchError}
        requireFields={requireFields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserController;
