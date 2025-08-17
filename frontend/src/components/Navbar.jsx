import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          eGain Analytics
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ textTransform: "none", ml: 2 }}
        >
          Account Summaries
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/logs"
          sx={{ textTransform: "none", ml: 2 }}
        >
          Web Logs
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/trending"
          sx={{ textTransform: "none", ml: 2 }}
        >
          Trends
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
