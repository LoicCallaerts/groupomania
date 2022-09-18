Context :
Projet 6 de la formation de développement web d'Open Class Room: Piiquant. Un API sécurisé d'avis gastronomique.

cd /Piiquant/back
Npm install

A fin de lancer le projet plusieurs modules sont nécessaires :

- NPM (Node Pack Manager) pour profité de certains modules qui seront utilisés.
  Installation => npm install

- Nodemon qui premet d'utiliser un serveur qui à mise à jours automatique, sans être obligé de le relancer à chaque modification.
  Instalatation => npm install -save nodemon

- Framework Express qui permet une création plus facile des API et des routers
  Installation => npm install --save express

- Mongoose qui permet de lier le projet et la base de donnée MongoDB et créer des formats de données
  Intallation => npm install --save mongoose

- Unique Validator qui s'assure qu'il n'y à qu'une adresse mail par compte
  Installation => npm install --save mongoose-unique-validator

- Bcrypt qui permet de hash les mots de passes et le rendre quasiment un indéchiffrable
  Installation => npm install --save bcrypt

- JSONWEBTOKEN qui permet de distribuer des TOKEN cryptés et de les décrypter au moment de la connexion
  Installation => npm install --save JSONWEBTOKEN

- Multer qui permet de gerer les fichiers rentrant dans les requêtes HTTP
  Installation => npm install-- save multer

- Password-validator qui permet de crées des regex au niveau de la base de donnée
  Installation => npm install --save password-validator

- Dotenv qui permet de créer et gerer des variable environemental
  Installation => npm install --save dotenv

- Helmet qui permet de sécuriser son site contre les attaques inters site
  Installation => npm install --save helmet
