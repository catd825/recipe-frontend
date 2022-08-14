import { useState } from "react";

export const Login = (props: any) => {
  const {
    authenticating,
    authenticationError,
    loginHandler,
    logOutHandler,
    user
  } = props;

  const loginCredentials = {
    username: "",
    password: ""
  };

  const [loginState, setLoginState] = useState(loginCredentials);

  const changeHandler = (event: any) => {
    event.persist();
    let updatedValue = {};
    updatedValue = { [event.target.name]: event.target.value };
    setLoginState(loginState => ({
      ...loginState,
      ...updatedValue
    }));
  };

  const submitHandler = (event: any, loginState: any, props: any) => {
    event.preventDefault();
    const formData = loginState;
    loginHandler(formData);
  };

  return (
    <>
      login page
      {authenticating && "Authenticating"}
      {!user && (
        <form>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={loginState.username}
            onChange={event => changeHandler(event)}
          ></input>
        </form>
      )}
    </>
  );
};

//     render () {
//         return (
//         <>
//             {this.props.authenticating === false ?
//                 <>
//                 {this.props.user === false
//                 ?
//                 <>
//                 <br/><br/><br/>
//                 <h1>Feelings<strong>Overflow</strong></h1>
//                 <br/><br/>
//                 <h3>Returning User</h3><br/>
//                 <h3 style={{color:"red"}}>{this.props.authenticationError}</h3>
//                 <div className="center">
//                 <Form onSubmit={event => this.submitHandler(event)} style={{ width: "300px" }}>

//                     <FormGroup>
//                         <Label for="username" className="mr-sm-2">Username</Label>
//                         <Input style={{ width: "300px" }} type="text" name="username" placeholder="username" value={this.state.username} onChange={event => this.changeHandler(event)} />
//                     </FormGroup>

//                     <FormGroup>
//                         <Label for="password" className="mr-sm-2">Password</Label>
//                         <Input style={{ width: "300px" }} type="password" name="password" placeholder="password" value={this.state.password} onChange={event => this.changeHandler(event)} />
//                     </FormGroup>

//                     <Button type="submit" value="Login">Submit</Button>

//                 </Form>
//                 </div><br/>
//                     <NavLink style={{ color: "black" }} tag={Link} to="/signup">New here? Sign up!</NavLink>
//                 </>
//                 :
//                 <>
//                     <div className="center">
//                         <h1>Can't login until you logout!</h1>
//                     </div>
//                     <button type="button" onClick={this.props.clickHandler}>Logout</button>
//                 </>

//                 }
//                 </>
//             :
//             <div className="center">
//                 <h1>Authenticating...</h1>
//             </div>
//             }
//             </>
//             )
//     }
// }

// export default Login
