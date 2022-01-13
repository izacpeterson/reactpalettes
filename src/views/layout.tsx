import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Menu, MenuItem, Image } from "semantic-ui-react";
import logo from "../logo.svg";

function Layout() {
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
          Home
        </MenuItem>
        <MenuItem as={Link} to="/Public">
          Public Palettes
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
}

export default Layout;
