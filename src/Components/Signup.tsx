import { useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces";

interface IProps {
  signUpHandler: (user: IUser) => void;
  user: IUser | boolean;
  logOutHandler: () => void;
  signupError: string | null;
}

export const Signup = (props: IProps) => {
  const defaultSignup = {
    username: "",
    password: "",
    bio: ""
  };

  const [signUpCredentials, setSignUpCredentials] = useState(defaultSignup);

  const changeHandler = (event: any) => {
    event.persist();
    let changingValue = {};
    changingValue = { [event.target.name]: event.target.value };
    setSignUpCredentials(signUpCredentials => ({
      ...signUpCredentials,
      ...changingValue
    }));
  };

  const signUpHandler = (event: any) => {
    event.preventDefault();
    const formData = signUpCredentials;
    props.signUpHandler(formData);
  };

  return (
    // add error handling - if empty fields, if user exists already, if password is invalid
    <>
      <form onSubmit={event => signUpHandler(event)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={signUpCredentials.username}
          onChange={event => changeHandler(event)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={signUpCredentials.password}
          onChange={event => changeHandler(event)}
        />
        <input
          type="text"
          name="bio"
          placeholder="bio"
          value={signUpCredentials.bio}
          onChange={event => changeHandler(event)}
        />
        <button>submit</button>
      </form>
      <Link to="/login">been here? log in!</Link>
    </>
  );
};
