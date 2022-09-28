// Importation du module express
const express = require("express");
const router = express.Router();

//Importation Middleware psaword
const password = require("../middleware/password");

// userCtrl faisant le lien entre le controler et les chemins
const userCtrl = require("../controllers/userCtrl");

// Chemin POST pour créer un compte
router.post("/signup", password, userCtrl.signup);
// Chemin POST pour se connecter à un compte existant
router.post("/login", userCtrl.login);

router.delete("/logout", userCtrl.logout);

module.exports = router;
