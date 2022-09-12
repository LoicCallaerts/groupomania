//Importation du module pour  donner des règles au mot de passe
const passwordValidator = require("password-validator");

// Création du schéma de mot de passe
const passwordSchema = new passwordValidator();

// Ajout des propriétés du schéma

passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces();

//Exporation du module
module.exports = (req, res, next) => {

  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({ error: `Le mot de passe n'est pas assez fort` });
  }
};
