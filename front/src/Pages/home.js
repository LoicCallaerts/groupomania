import * as React from "react";
import { useNavigate } from "react-router-dom";

// Import MUI
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

// Import Assets 
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Logo from "../assets/icons/icon-left-font-monochrome-white.png";

//Import API
const API_URL = process.env.REACT_APP_API_URL;

export default function Home() {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = React.useState();
  const [description, setdDscription] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [likes, setLikes] = React.useState();

  const postForm = React.useRef(null)
  const imageInput = React.useRef(null)

  const [postDescription, setPostDescription] = React.useState("")


  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData()
    const image = imageInput.current.files[0]

    formData.append("imageUrl", image)
    formData.append("description", postDescription)
    formData.append("pseudo", "tartenpion")
    formData.append("userId", "tartenpion")

    console.log(formData.get("imageUrl"))
    console.log(formData.get("description"))
    console.log(formData.get("pseudo"))
    console.log(formData)


    await fetch(`${API_URL}/api/article`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success", res.data)
          getPosts()
        }
      })
      .catch((err) => {
        console.log(err)
        console.log(formData)
      });
      
  
};

  const getPosts = () => {
    console.log("fetching posts")
    fetch(`${API_URL}/api/article`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success", res.data)
        }
      })
      .catch((err) => console.log(err));
  }

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
      >
        <form 
          ref={postForm}
        >
          <TextField
            id="description"
            label="Quoi de neuf ? "
            name="description"
            multiline
            maxRows={4}
            inputProps={{ maxLength: 500 }}
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
          <IconButton aria-label="Tu peux ajouter une image" component="label">
            <input hidden accept="image/*" type="file" name="imageUrl" ref={imageInput} />
            <ImageSearchIcon />
          </IconButton>
          <Button
            color="inherit"
            variant="h2"
            size="medium"
            component="div"
            width="30%"
            onClick={(e) => handleSubmit(e)}
          >
            Envois
          </Button>
        </form>
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
