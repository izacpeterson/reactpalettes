import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Menu, MenuItem } from "semantic-ui-react";

function Layout() {
  return (
    <>
      <Menu stackable>
        <MenuItem>
          <Header as="h1">Color Palette</Header>
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
    </>
  );
}

export default Layout;
