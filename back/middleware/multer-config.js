const multer = require("multer");

// Bibliothèque/Objet qui contiens les extensions qui
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Constant qui permet de stocker les images sur le disque dure
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //explique quel nom des fichier il aura
  filename: (req, file, callback) => {
    // génère nouveau nom pour le fichier/
    // Garde le nom du fichier d'origine, supprime les espaces vide et les remplace par des "_"
    const name = file.originalname.split(" ").join("_");
    // Generation de l'extension selon le mime type associer au fichier entrant
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// Exportation de la méthode Multer avec l'envois au storage et l'acceptation des images uniquement
module.exports = multer({ storage: storage }).single("image");
