import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

function HomeNavBar({ user }: { user: string }) {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body1">Collaborative Board </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" component="span" sx={{ marginRight: 1 }}>
            {user ? `Hi, ${user}` : "Hi"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HomeNavBar;
