// Importationde mongoose pour la base de donnée
const mongoose = require("mongoose");

// Schéma de sauces
const articleSchema = mongoose.Schema({
  userId: { type: String, required: true },
  pseudo: { type: String, required: true },
  description: { type: String, maxLength: 500 },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  usersLiked: [{ type: String, default: [] }],
});

module.exports = mongoose.model("Article", articleSchema);
