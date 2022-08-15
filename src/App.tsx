import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Components/Login";
import {
  Route,
  Routes as Switch,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { Signup } from "./Components/Signup";
import { RecipeContainer } from "./Containers/RecipeContainer";
import { IUser } from "./interfaces";
import { fetchUserInfo } from "./fetch/authFetchCalls";

function withRouter(App: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <App {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function App(props: any) {
  const [user, setUser] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [signUpError, setSignUpError] = useState(null);
  const [authenticationError, setAuthenticationError] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const history = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserInfo(token, setUser, history);
    } else {
      history("/login");
      setIsUserLoaded(true);
    }
  }, []);

  const signUpHandler = (userObj: IUser) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: userObj })
    };
    fetch("http://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          loginHandler(user);
          setUser(data.user);
          history("/");
        } else {
          setSignUpError(data);
        }
      });
  };

  const loginHandler = (loggedInUser: IUser | boolean) => {
    setAuthenticating(true);
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: loggedInUser })
    };

    fetch("http://localhost:3000/api/v1/login", configObj)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setUser(data.user);
          setAuthenticating(false);
          history("/");
        } else {
          setAuthenticationError(data.message);
          setAuthenticating(true);
        }
      });
  };

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  const editHandler = (userObj: any) => {
    let newUser = {
      birthdate: userObj.birthdate,
      gender: userObj.gender,
      location: userObj.location
    };

    const token = getToken();

    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: newUser })
    };
    // update when edit routes are created
    fetch(`http://localhost:3000/api/v1/users/${"2"}`, configObj)
      .then(response => response.json())
      .then(data => {
        updateUser(data.user);
        history(`/users/${data.user.id}`);
      });
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    history("/login");
    setUser(false);
  };

  return (
    <>
      {user && <button onClick={() => logOutHandler()}>logout</button>}
      <Switch>
        <Route
          path="/login"
          element={
            <Login
              authenticating={authenticating}
              loginHandler={loginHandler}
              authenticationError={authenticationError}
              user={user}
              logOutHandler={logOutHandler}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              submitHandler={signUpHandler}
              user={user}
              clickHandler={logOutHandler}
              signupError={signUpError}
            />
          }
        />
        <Route path="/" element={<RecipeContainer user={user} />} />
      </Switch>
    </>
  );
}

export default withRouter(App);
