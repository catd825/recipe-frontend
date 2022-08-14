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

  const retrieveUserProfile = (token: string) => {
    fetch("http://localhost:3000/api/v1/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setUser(data.user);
          setIsUserLoaded(true);
        }
      });
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log(token)
      retrieveUserProfile(token);
    } else {
      history("/login");
      setIsUserLoaded(true);
    }
  }, []);

  const signupHandler = (userObj: any) => {
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: userObj })
    };

    fetch("https://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          loginHandler(user);
          setUser(data.user);
        } else {
          setSignUpError(data);
        }
      });
  };

  const loginHandler = (userInfo: any) => {
    setAuthenticating(true);
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    };

    fetch("https://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setUser(data.user);
          setAuthenticating(false);
          props.history.push("/");
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
    fetch(`https://localhost:3000/api/v1/users/${"2"}`, configObj)
      .then(response => response.json())
      .then(data => {
        updateUser(data.user);
        props.history.push(`/users/${data.user.id}`);
      });
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
    setUser(false);
  };

  return (
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
            submitHandler={signupHandler}
            user={user}
            clickHandler={logOutHandler}
            signupError={signUpError}
          />
        }
      />
      <Route
        path="/"
        element={
          <RecipeContainer
            user={user}
          />
        }
      />
    </Switch>
  );
}

export default withRouter(App);
