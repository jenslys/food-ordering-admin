import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  let navigate = useNavigate();

  const { isSignedIn } = useUser();

  const loginRedirect = () => {
    let path = `/dashboard`;
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Button color="inherit" onClick={loginRedirect()}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
