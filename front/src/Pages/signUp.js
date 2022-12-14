import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextField, Box, Typography, Container } from "@mui/material";

import background from "../assets/signUp.jpg";

const API_URL = process.env.REACT_APP_API_URL;

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [pseudo, setPseudo] = React.useState();
  const styles = {
    mainContainer: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      pt: 8,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(username, password, pseudo);

    const body = {
      email: username,
      password: password,
      pseudo: pseudo,
    };

    fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth={false} sx={styles.mainContainer}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#ededed",
              p: 5,
              borderRadius: "16px",
            }}
          >
            <Typography component="h1" variant="h5">
              Création de compte
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                name="pseudo"
                label="Nom d'utilisateur "
                type="text"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
              />
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="Adresse mail"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                name="mot de passe"
                label="mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Créé ton compte
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
}
