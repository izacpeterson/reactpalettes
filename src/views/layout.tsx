import React from "react";
import { useContext } from "react";
import { Context } from "../contexts/global.context";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Menu, MenuItem, Image } from "semantic-ui-react";
import logo from "../logo.svg";

function Layout() {
  const user = useContext(Context);

  if (user.loggedIn) {
    return (
      <>
        <Menu stackable>
          <MenuItem>
            <Header as="h1">
              <Image size="huge" src={logo} />
              Color Palette
            </Header>
          </MenuItem>
          <MenuItem as={Link} to="/">
            My Colors
          </MenuItem>
          <MenuItem as={Link} to="/Public">
            Public Colors
          </MenuItem>
          <MenuItem as={Link} to="/Account">
            My Account
          </MenuItem>
          <MenuItem as={Link} to="/Access">
            Sign In
          </MenuItem>
        </Menu>

        <Outlet />

        <footer>
          Made by <a href="https://www.izacpeterson.com">Izac</a>
        </footer>
      </>
    );
  } else {
    return (
      <>
        <Menu stackable>
          <MenuItem>
            <Header as="h1">
              <Image size="huge" src={logo} />
              Color Palette
            </Header>
          </MenuItem>
          <MenuItem as={Link} to="/">
            Public Colors
          </MenuItem>
          <MenuItem as={Link} to="/Access">
            Sign In
          </MenuItem>
        </Menu>

        <Outlet />

        <footer>
          Made by <a href="https://www.izacpeterson.com">Izac</a>
        </footer>
      </>
    );
  }
}

export default Layout;
