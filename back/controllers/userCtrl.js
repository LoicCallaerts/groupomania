// Importation du modul bcrypt pour hash des mots de passe
const bcrypt = require("bcrypt");
// Récuperation du shéma User
const User = require("../models/user");
//Importation du modul jsonwebtoken pour créé des token de connexion
const jwt = require("jsonwebtoken");

let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

// Création et exportation de la logique de création de comptes
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Création et exportation de la logique de connexion et attribution de token
exports.login = (req, res, next) => {
  const data = req.body;

  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Identifiant ou mot de passe incorect" });
      }

      bcrypt
        .compare(data.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Identifiant ou mot de passe incorect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
};
