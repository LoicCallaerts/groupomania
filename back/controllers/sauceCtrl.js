// Importation du modèle de sauce
const Sauce = require("../models/sauce");
// Importation du module "fs"
const fs = require("fs");

// Logique d'affichage de toutes les sauces

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Logique d'affichage d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Logique de création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    // Création de l'URL de l'image, protocol : http, host : 300, /images/ pour image, file name pour son nom
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Logique de modification d'une sauce
exports.modifySauce = (req, res, next) => {
  // recuperation du fichier
  if (req.file) {
    // Instruction trouver une sauce par son ID
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Si l'userID est different de l'utilisateur actuellement authentifié, erreur
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          //Sinon supression de l'image et de son nom
          const filename = sauce.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const sauceObject = req.file
              ? {
                  ...JSON.parse(req.body.sauce),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`,
                }
              : { ...req.body };
            Sauce.updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
              .catch((error) => req.status(400).json({ error }));
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // Sinon recuperation de tous les élément du body, et update de l'ID de la sauce et et de l'objet sauce
    const sauceObject = { ...req.body };
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => req.status(400).json({ error }));
  }
};

// Logique de suppression d'une saucce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Logique d'ajout de like/dislike + suppression du like/dislike et vérification par ID de la personne qui like
exports.likeAndDislikeSauces = (req, res, next) => {
  // Si l'utilisateur like une fois, ajoute 1 et ajoute l'ID utilisateur dans le tableau [userLike]
  if (req.body.like === 1) {
    Sauce.updateOne(
      //récuperation de la sauce par son ID
      { _id: req.params.id },
      {
        // augmente le like de 1
        $inc: { likes: req.body.like++ },
        //Ajoute l'userID dans le tableau like
        $push: { usersLiked: req.body.userId },
      }
    )
      .then((sauce) => res.status(200).json({ message: "Like ajouté" }))
      .catch((error) => res.status(400).json({ error }));
  }
  // Si l'utilisateur dislike une fois, retire 1 et ajoute l'ID utilisateur dans le tableau [userDislike]
  else if (req.body.like === -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )

      .then((sauce) => res.status(200).json({ message: "Dislike ajouté" }))
      .catch((error) => res.status(400).json({ error }));
  }
  // Sinon l'utilisateur à déjà liker/dislike
  else {
    //Récuperation de la sauce par son ID
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Si la sauce et déjà liker et que l'utilisateur est déjà dans le tableau, supprime le like
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            //modification d'une sauce par son ID
            { _id: req.params.id },
            //ajoute de l'utilisateur dans le tableau en lui retirant son like
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Like supprimé" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
        //Si la sauce et déjà dislike et que l'utilisateur est déjà dans le tableau, supprime le like
        else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Dislike supprimé" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
