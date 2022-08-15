import { useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces";

interface IProps {
  authenticating: boolean;
  authenticationError: string;
  loginHandler: (formData: IUser) => void;
  logOutHandler: () => void;
  user: boolean | IUser;
}

export const Login = (props: IProps) => {
  const {
    authenticating,
    authenticationError,
    loginHandler,
    logOutHandler,
    user
  } = props;

  const defaultLogin = {
    username: "",
    password: ""
  };

  const [loginCredentials, setLoginCredentials] = useState(defaultLogin);

  const changeHandler = (event: any) => {
    event.persist();
    let changingValue = {};
    changingValue = { [event.target.name]: event.target.value };
    setLoginCredentials(loginCredentials => ({
      ...loginCredentials,
      ...changingValue
    }));
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    const formData = loginCredentials;
    loginHandler(formData);
  };

  return (
    <>
      login page
      {authenticating && "Authenticating"}
      {!user && (
        <form onSubmit={event => submitHandler(event)}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={loginCredentials.username}
            onChange={event => changeHandler(event)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={loginCredentials.password}
            onChange={event => changeHandler(event)}
          />
          <button>submit</button>
        </form>
      )}
      <Link to="/signup">new here? sign up!</Link>
    </>
  );
};
