console.log('serveur node ok 🙂');

//! 1)Importer Express + créer le serveur
const express = require('express'); //import d'express
const server = express(); //création du serveur express, peut aussi être appelé app au lieu de server.

//* Récupération des variables d'environnement :
const {PORT, DB_CONNEXION} = process.env;

//* Pour paramètrer le fait que l'API doit comprendre que du JSON arrive :
server.use(express.json());

//* Utilisation du middleware cors :
const cors = require('cors');

    // Configuration "Tout le monde est autorisé à consommer notre API", parfait pour du Dev :
server.use(cors());
    
    
    // Configuration pour de la production : "Autroriser uniquement pour notre appli react" :
// server.use(cors({
//     origin : 'http://localhost:5173',
//     methods : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

//* Connexion à la DB :
const mongoose = require('mongoose');

mongoose.connect(DB_CONNEXION, { dbName: 'GardenManager' })
    .then(() => console.log('Connectée à la DB !  U da best 🫶'))
    .catch((err) => console.log(`Connexion échouée : ${err}`));


//! 2) Traiter les requêtes :
const router = require('./routes'); // = import de l'objet router, le routeur principal, depuis index.js
server.use('/api', router); // = indiquer au serveur d'utiliser le router importé.


//! 3) Écouter le serveur sur un port spécifique
server.listen(3000, () => {
    console.log(`🚀 Express Server started on port ${ 3000 }`);
});