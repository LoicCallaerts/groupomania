// Importation du module Moongoose
const mongoose = require("mongoose");
//Importation du module "unique validator" pour ne crer qu'un seul compte avec une seule adress mail
const uniqueValidator = require("mongoose-unique-validator");

// Création du schéma user avec email et mot de passe
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
      "Une adress mail valide est requise",
    ],
  },
  password: { type: String, require: true },

  username: { type: String, require: true}
});

// Appel à la fonction unique validator
userSchema.plugin(uniqueValidator);

//Exportation du schéma utilisateur
module.exports = mongoose.model("User", userSchema);
