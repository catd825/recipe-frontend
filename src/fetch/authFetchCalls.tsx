import axios from "axios";
import { IUser } from "../interfaces";

export const fetchUserInfo = async (
  token: string,
  setUser: any,
  history: any
) => {
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
};

// const signUpHandler = async (
//   userObj: IUser,
//   loginHandler: any,
//   setUser: any,
//   history: any,
//   setSignUpError: any
// ) => {
//   const configObj = {
//     // headers: {
//     //   "Content-Type": "application/json",
//     //   accepts: "application/json"
//     // },
//     body: JSON.stringify({ user: userObj })
//   };
//   try {
//     const resp = await axios.post(
//       "http://localhost:3000/api/v1/users",
//       configObj
//     );
//     const { data } = resp;

//     loginHandler(data.user);
//     setUser(data.user);
//     history("/");
//   } catch (err) {
//     setSignUpError(err);
//     return err;
//   }
// };
