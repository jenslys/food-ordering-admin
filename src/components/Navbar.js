import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Orders
          </Typography>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Button color="inherit" onClick={() => loginRedirect()}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
