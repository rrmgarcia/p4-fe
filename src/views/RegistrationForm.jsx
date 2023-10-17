import styles from "../styles/RegistrationForm.module.css";

const RegistrationPage = (props) => {
  const {
    email,
    username,
    password,
    confirmPassword,
    handleSubmit,
    handleChange,
    emailError,
    usernameError,
    passwordError,
    confirmPasswordError,
    passDoesNotMatchError,
    requireFields,
  } = props;

  return (
    <div>
      <form id={styles.registrationForm} onSubmit={handleSubmit}>
        <h3>Please register below.</h3>
        <label>Email Address:</label>
        <input
          type="email"
          id="email"
          className={styles.registrationInput}
          value={email}
          onChange={handleChange}
        ></input>
        {emailError ? (
          <div className={styles.errorMsg}>Please enter valid email.</div>
        ) : null}
        <label>Username:</label>
        <input
          type="text"
          id="username"
          className={styles.registrationInput}
          value={username}
          onChange={handleChange}
        ></input>
        {usernameError ? (
          <div className={styles.errorMsg}>Username cannot be blank.</div>
        ) : null}
        <label>Password:</label>
        <input
          type="password"
          id="password"
          className={styles.registrationInput}
          value={password}
          onChange={handleChange}
        ></input>
        {passwordError ? (
          <div className={styles.errorMsg}>Password cannot be blank.</div>
        ) : null}
        <label>Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className={styles.registrationInput}
          value={confirmPassword}
          onChange={handleChange}
        ></input>
        {confirmPasswordError ? (
          <div className={styles.errorMsg}>Password cannot be blank.</div>
        ) : null}
        {passDoesNotMatchError ? (
          <div className={styles.errorMsg}>Passwords do not match.</div>
        ) : null}
        {requireFields ? (
          <div className={styles.errorMsg}>
            There are fields that require your attention.
          </div>
        ) : null}
        <div>
          <input
            type="submit"
            value={"Proceed"}
            className={styles.button}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
