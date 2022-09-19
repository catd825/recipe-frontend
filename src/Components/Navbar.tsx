import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

export const Navbar = (props: any) => {
  const NavbarDiv = styled.div({
    backgroundColor: "grey",
    height: "50px",
    margin: "auto",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center"
  });

  const SpanWrapper = styled.div({
    textAlign: "center",
    paddingTop: "10px"
  });
  const NavSpan = styled.span({
    padding: "10px",
    cursor: "pointer"
  });

  const { user, logout } = props;
  console.log(user)
  const { pathname } = useLocation();
  return (
    <NavbarDiv>
      <SpanWrapper>
        <NavSpan>{<Link to='/'>Home</Link>}</NavSpan>
        <NavSpan>{user?.id && <Link to={`/users/${user.id}/recipes`}>View my recipes</Link>}</NavSpan>
        <NavSpan>{user && <button onClick={logout}>logout</button>}</NavSpan>
        <NavSpan>
          {!user && pathname !== "/login" && <Link to="/login">Login!</Link>}
        </NavSpan>
      </SpanWrapper>
    </NavbarDiv>
  );
};
