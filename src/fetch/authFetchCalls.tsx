import axios from "axios";
import { IUser } from "../interfaces";

export async function fetchUserInfo(token: string, setUser: any, history: any) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/profile/",
      config
    );
    const { data } = response;
    setUser(data.user);
    return data;
  } catch (error) {
    history("/signup");
    return error;
  }
}

export async function signUpHandler(
  token: string,
  setUser: any,
  loginHandler: any,
  history: any,
  setSignUpError: any,
  userObj: IUser
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ user: userObj })
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users",
      config
    );
    const { data } = response;
    loginHandler(data.user);
    setUser(data.user);
    history("/");
    return data;
  } catch (error) {
    setSignUpError(error);
    return error;
  }
}
