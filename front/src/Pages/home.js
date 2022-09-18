import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Logo from "../assets/icons/icon-left-font-monochrome-white.png";
const API_URL = process.env.REACT_APP_API_URL;

export default function Home() {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = React.useState();
  const [description, setdDscription] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [likes, setLikes] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      pseudo: pseudo,
      description: description,
      imageUrl: imageUrl,
      likes: likes,
    };

    const postArticle = fetch(`${API_URL}/api/article`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
      <Box>
        <AppBar position="static" sx={{ bgcolor: "#4E5166" }}>
          <Toolbar>
            <Button
              variant="h2"
              size="medium"
              component="div"
              width="30%"
              sx={{ flexGrow: 1 }}
            >
              Mes Post
            </Button>

            <img src={Logo} width="30%" alt="" />
            <Button
              color="inherit"
              variant="h2"
              size="medium"
              component="div"
              width="30%"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="form"
        sx={{
          pt: 5,
          pl: 54,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottom: 1,
          boxShadow: 1,
          borderRadius: "16px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="description"
          label="Quoi de neuf ? "
          multiline
          maxRows={4}
          inputProps={{ maxLength: 500 }}
        />
        <IconButton aria-label="Tu peux ajouter une image" component="label">
          <input hidden accept="image/*" type="file" />
          <ImageSearchIcon />
        </IconButton>
        <Button
          color="inherit"
          variant="h2"
          size="medium"
          component="div"
          width="30%"
        >
          Envois
        </Button>
      </Box>

      <Box
        sx={{
          mt: 4,
          ml: 4,
          mr: 4,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "16px",
        }}
      >
        <Card
          sx={{
            maxWidth: "35%",
          }}
        >
          <CardMedia
            id="imagesUrl"
            component="img"
            alt="green iguana"
            height="200"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary" id="description">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton id="likes" aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
