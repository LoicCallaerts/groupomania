// Importationde mongoose pour la base de donnée
const mongoose = require('mongoose')

// Schéma de sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, index: true, unique: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [{ type: String, default: [] }],
    usersDisliked: [{ type: String, default: [] }],
})

module.exports = mongoose.model('Sauce', sauceSchema)