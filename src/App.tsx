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
import axios from "axios";
import { Navbar } from "./Components/Navbar";
import styled from "@emotion/styled";
import { MyRecipesContainer } from "./Containers/MyRecipesContainer";

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
  const [token, setToken] = useState(getToken());

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserInfo = async (token: string | null) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/profile/",
        config
      );
      const { data } = response;
      setUser(data.user);
      console.log(data);
      return data;
    } catch (error) {
      history("/signup");
      return error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo(token);
      setIsUserLoaded(true);
    } else {
      setIsUserLoaded(false);
    }
  }, []);

  const signUpHandler = (newUser: IUser) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: newUser })
    };
    fetch("http://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          loginHandler(user);
          setUser(data.user);
          history("/recipes");
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
          setToken(data.jwt);
          setUser(data.user);
          setAuthenticating(false);
          history("/recipes");
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
    setToken(null);
    history("/login");
    setUser(false);
  };

  const BodyWrapper = styled.div({
    marginTop: "140px"
  });

  return (
    <>
      <Navbar user={user} logout={() => logOutHandler()} token={token} />
      <BodyWrapper>
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
                signUpHandler={signUpHandler}
                user={user}
                logOutHandler={logOutHandler}
                signupError={signUpError}
              />
            }
          />
          <Route
            path="/users/:id/recipes"
            element={<MyRecipesContainer token={token} user={user} />}
          />
          <Route
            path="/recipes/"
            element={<RecipeContainer token={token} user={user} />}
          />
          <Route
            path="/recipes/:id"
            element={<RecipeContainer token={token} user={user} />}
          />
          {/* If user is not logged in - they can still see all recipes */}
          <Route
            path="/"
            element={<RecipeContainer token={token} user={user} />}
          />
        </Switch>
      </BodyWrapper>
    </>
  );
}

export default withRouter(App);
