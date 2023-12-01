import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
      <Typography variant="h1" style={{ marginBottom: "20px", fontSize: "3em" }}>
        Food ordering app
      </Typography>
      <Button variant="contained" color="primary" href="/sign-in/">
        Log in
      </Button>
    </div>
  );
}
