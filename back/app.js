// Récuperation du module express
const express = require("express");
const app = express();

const fs = require("fs");

//Récuperation du module mongoose
const mongoose = require("mongoose");

// Récupération des chemin (GET, POST, PUT, DELETE) pour les sauces
const articlePath = require("./path/articlePath");
//Récuperation des chemins POST pour la connection et la création de comptes
const userPath = require("./path/userPath");
const path = require("path");

//Importation des variables d'environement pour cacher le User et le password
require("dotenv").config();
const usrAdmin = process.env.ADMIN_USER;
const userPassword = process.env.ADMIN_PASSWORD;

// Importation du modul helmet
app.use(express.json());
const helmet = require("helmet");

app.use(express.urlencoded({ extended: true }));

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

mongoose
  .connect(
    `mongodb+srv://${usrAdmin}:${userPassword}@cluster0.yayhpt7.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));
app.use("/api/article", articlePath);
app.use("/api/auth", userPath);

module.exports = app;
