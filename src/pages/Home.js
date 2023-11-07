import React from "react";
import Typography from "@mui/material/Typography";

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
        Pizza ordering Dashboard
      </Typography>
    </div>
  );
}
