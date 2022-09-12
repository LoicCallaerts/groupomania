import * as React from "react";
// MUI
import {Button, TextField, Link, Box, Typography,  Container, Grid} from "@mui/material"
// Assets
import background from "../assets/openspace.jpg";
import signInLogo from "../assets/icons/icon-left-font.png";

const API_URL = process.env.REACT_APP_API_URL

export default function SignIn() {

  const styles = {
    mainContainer: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      pt: 8
    }
  }

  const [username, setUsername] = React.useState()
  const [password, setPassword] = React.useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    
    console.log(username, password);

    console.log(API_URL)

    const body = {
      email: username,
      password: password
    }

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then((res) => {
      console.log(res)
      console.log(res.status)
    }).catch(err => console.log(err))
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={styles.mainContainer}
      >
          <Container component="main" maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#ffffff",
                padding: 15
              }} 
            >

              <img 
                src={signInLogo} 
                width="100%" 
                height="auto" 
                alt="" 
              />

              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="mail"
                  // autoComplete="email"
                  bgcolor="#FFD7D7"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="mot de passe"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  // autoComplete="current-password"
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#4E5166" }}
                >
                  Connexion
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Tu n'as pas de compte ? Clique ici"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      </Container>
    </>
  );
}
