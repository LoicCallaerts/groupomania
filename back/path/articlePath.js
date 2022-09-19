// Importation du module express
const express = require("express");
const router = express.Router();

// Middleware pour empêcher action des personnes qui ne sont pas log
const auth = require("../middleware/auth");

// Middleware pour appeler multer configuré
const multer = require("../middleware/multer-config");

// sauceCtrl faisant le lien entre le controler et les chemins

const articleCtrl = require("../controllers/articleCtrl");

// Chemin GET pour afficher toutes les sauces
router.get("/", auth, articleCtrl.getAllArticle);

// Chemin GET pour afficher une sauce
router.get("/:id", auth, articleCtrl.getOneArticle);

// Chemin POST pour créer une sauce
router.post("/", auth, multer, articleCtrl.createArticle);

// CHemin PUT pour changer une sauce
router.put("/:id", auth, multer, articleCtrl.modifyArticle);

// Chemin DELETE pour supprimer une sauce
router.delete("/:id", auth, articleCtrl.deleteArticle);

// Chemin like ou dislike d'une sauce
router.post("/:id/like", multer, articleCtrl.likeArticle);

module.exports = router;
