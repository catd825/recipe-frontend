import { useState } from "react";
import { IUser } from "../interfaces";

interface IProps {
  submitHandler: (user: IUser) => void;
  user: IUser | boolean;
  clickHandler: () => void;
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

  const submitHandler = (event: any) => {
    event.preventDefault();
    const formData = signUpCredentials;
    props.submitHandler(formData);
  };

  return (
    // add error handling - if empty fields, if user exists already, if password is invalid
    <>
      <form onSubmit={event => submitHandler(event)}>
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
    </>
  );
};
