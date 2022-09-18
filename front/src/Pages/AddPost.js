import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material/";
import Logo from "../assets/icons/icon-left-font-monochrome-black.png";

export default function Home() {
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ bgcolor: "#FD2D01" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mes Post
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Création de Post
            </Typography>
            <img src={Logo} width="30%" alt="" />
            <Button color="inherit" sx={{ p: 2 }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
