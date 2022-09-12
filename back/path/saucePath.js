// Importation du module express
const express = require("express");
const router = express.Router();

// Middleware pour empêcher action des personnes qui ne sont pas log
const auth = require("../middleware/auth");

// Middleware pour appeler multer configuré
const multer = require("../middleware/multer-config");

// sauceCtrl faisant le lien entre le controler et les chemins

const sauceCtrl = require("../controllers/sauceCtrl");

// Chemin GET pour afficher toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauce);

// Chemin GET pour afficher une sauce
router.get("/:id", auth, sauceCtrl.getOneSauce);

// Chemin POST pour créer une sauce
router.post("/", auth, multer, sauceCtrl.createSauce);

// CHemin PUT pour changer une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

// Chemin DELETE pour supprimer une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);

// Chemin like ou dislike d'une sauce
router.post('/:id/like', multer, sauceCtrl.likeAndDislikeSauces)

module.exports = router;
