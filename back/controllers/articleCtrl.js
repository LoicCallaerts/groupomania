// Importation du modèle de sauce
const Sauce = require("../models/article");
// Importation du module "fs"
const fs = require("fs");

// Logique d'affichage de toutes les sauces

exports.getAllArticle = (req, res, next) => {
  Article.find()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Logique d'affichage d'une seule sauce
exports.getOneArticle = (req, res, next) => {
  Article.findOne({
    _id: req.params.id,
  })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Logique de création de article
exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.sauce);
  delete articleObject._id;
  delete articleObject._userId;
  const article = new Article({
    ...articleObject,
    userId: req.auth.userId,
    // Création de l'URL de l'image, protocol : http, host : 300, /images/ pour image, file name pour son nom
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  article
    .save()
    .then(() => {
      res.status(201).json({ message: "Post enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Logique de modification d'une sauce
exports.modifyArticle = (req, res, next) => {
  // recuperation du fichier
  if (req.file) {
    // Instruction trouver une sauce par son ID
    Article.findOne({ _id: req.params.id })
      .then((article) => {
        // Si l'userID est different de l'utilisateur actuellement authentifié, erreur
        if (article.userId != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          //Sinon supression de l'image et de son nom
          const filename = article.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const articleObject = req.file
              ? {
                  ...JSON.parse(req.body.sauce),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`,
                }
              : { ...req.body };
            Article.updateOne(
              { _id: req.params.id },
              { ...articleObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Post modifiée !" }))
              .catch((error) => req.status(400).json({ error }));
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    // Sinon recuperation de tous les élément du body, et update de l'ID de la sauce et et de l'objet sauce
    const articleObject = { ...req.body };
    Article.updateOne(
      { _id: req.params.id },
      { ...articleObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Post modifié !" }))
      .catch((error) => req.status(400).json({ error }));
  }
};

// Logique de suppression d'une saucce
exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      if (article.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = article.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Article.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimé !" });
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
exports.likeArticle = (req, res, next) => {
  // Si l'utilisateur like une fois, ajoute 1 et ajoute l'ID utilisateur dans le tableau [userLike]
  if (req.body.like === 1) {
    Article.updateOne(
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
  // Sinon l'utilisateur à déjà liker/dislike
  else {
    //Récuperation de la sauce par son ID
    Article.findOne({ _id: req.params.id })
      .then((article) => {
        // Si la article et déjà liker et que l'utilisateur est déjà dans le tableau, supprime le like
        if (article.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            //modification d'une article par son ID
            { _id: req.params.id },
            //ajoute de l'utilisateur dans le tableau en lui retirant son like
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((article) => {
              res.status(200).json({ message: "Like supprimé" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
        //Si la sauce et déjà dislike et que l'utilisateur est déjà dans le tableau, supprime le like
        else if (article.usersDisliked.includes(req.body.userId)) {
          Article.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((article) => {
              res.status(200).json({ message: "Like supprimé" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
