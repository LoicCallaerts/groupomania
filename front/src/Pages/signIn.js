import * as React from "react";
import { useNavigate } from "react-router-dom";
// MUI
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useCookies } from "react-cookie";
// Assets
import background from "../assets/signIn.jpg";
import signInLogo from "../assets/icons/icon-left-font.png";

const API_URL = process.env.REACT_APP_API_URL;

export default function SignIn() {
  const navigate = useNavigate();

  const styles = {
    mainContainer: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      pt: 8,
    },
  };

  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [cookies, setCookie] = useCookies(["user"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie("res.token", "res.userId", { path: "/" });

    const user = {
      email: username,
      password: password,
    };

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth={false} sx={styles.mainContainer}>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#ededed",
              p: 5,
              borderRadius: "16px",
            }}
          >
            <img src={signInLogo} width="100%" height="auto" alt="" />

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
                variant="filled"
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
                variant="filled"
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
