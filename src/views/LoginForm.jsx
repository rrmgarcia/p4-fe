import React from "react";
import styles from "../styles/LoginForm.module.css";

const SignInPage = (props) => {
  const {
    handleSubmit,
    handleChange,
    username,
    password,
    usernameError,
    passwordError,
    doesNotMatch,
  } = props;

  return (
    <div>
      <form id={styles.loginForm} onSubmit={handleSubmit}>
        <h3>Please sign-in below</h3>
        <label>Username:</label>
        <input
          type="text"
          className={styles.loginInput}
          id="username"
          value={username}
          onChange={handleChange}
        ></input>
        {usernameError ? (
          <div className={styles.errorMsg}>Please enter valid username.</div>
        ) : null}
        <label>Password:</label>
        <input
          type="password"
          className={styles.loginInput}
          id="password"
          value={password}
          onChange={handleChange}
        ></input>
        {passwordError ? (
          <div className={styles.errorMsg}>Please enter valid password.</div>
        ) : null}
        {doesNotMatch ? (
          <div className={styles.errorMsg}>
            Username and Password do not match.
          </div>
        ) : null}
        <input
          type="submit"
          id={styles.loginSubmitButton}
          value={"Sign-in"}
          className={styles.button}
        ></input>
      </form>
    </div>
  );
};

export default SignInPage;
