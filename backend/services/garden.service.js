const { trusted } = require('mongoose');
const Garden = require('../models/garden.model');

const gardenService = {
    
    find : async(userId) => {
        // On cherche les jardins par utilisateur connecté, donc on a besoin de l'id d'un utilisateur en paramètre pour la recherche.
        try {

            const gardensByUser = await Garden.find({user_id : userId})

            return gardensByUser;

        } catch(err) {
             console.log(err);
            throw new Error(err);
        }

    },

    findById : async(id) => {
        try {

            const searchedGarden = await Garden.findById(id);
            // Aussi ok .findOne { id : id};

            return searchedGarden;

        } catch(err) {
             console.log(err);
            throw new Error(err);
        }
    },
    
    create : async(garden) => {
        try {

            const gardenToAdd = Garden(garden);
                // Ici, gardenToAdd = l'objet qu'on souhaite créer
                // Garden = le modèle sur base duquel on va le créer
                // garden = les infos du body, qui vont être modelées selon le model Garden.
                // Donc : const objetCréé = Model(infos du body)

            await gardenToAdd.save();

            return gardenToAdd;

        } catch(err) {
             console.log(err);
            throw new Error(err);
        }
    },

    update : async(id, newData) => {
        try {

            const updatedGarden = await Garden.findByIdAndUpdate(id, newData);
            //* findByIdAnUpdate : trouve la ressource ET la modifie directement.
            // premier param (id) = ressource à modifier (un jardin)
            // second param (newData) = modifications à apporter à cette ressource
            // Ce second param peut prendre deux formes :
            // - de nouvelles informations qui complètent / remplacent les anciennes (c'est le cas ici, le body envoyé écrase les anciennes infos)
            // - une action à réaliser, souvent plus précise qu'un simple body à remplacer : ajouter/ retirer une propriété à un tableau, incrémenter un nombre...

            if(updatedGarden) {
                // = Si une ressource avec cet id existait et a été update => true
                return true;
            } else { // Si elle n'existait pas, => false
                return false;
            }

        } catch(err) {
             console.log(err);
            throw new Error(err);
        }
        // Dans le controller, ce booléen permettra de renvoyer un message 200 ou 204 si l'update a réussi, ou un message 400 si la ressource n'existait pas.
    },

    addPlant : async(id, plantId) => {

        try {
            const addedPlant = await Garden.findByIdAndUpdate(id, { $push: { plants: plantId } });
            // { $push: { plants: plantId } } = dans le tableau plants, AJOUTER plantId.

            if (addedPlant) {
                return true;
            } else {
                return false;
            }

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    removePlant : async(id, plantId) => {

        try {
            const removedPlant = await Garden.findByIdAndUpdate(id, { $pull: { plants: plantId } });
            // { $pull: { plants: plantId } } = dans le tableau plants, RETIRER plantId.

            if (removedPlant) {
                return true;
            } else {
                return false;
            }

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    delete : async(id) => {
        try {
            const deletedGarden = await Garden.findByIdAndDelete(id);
            //* findByIdAnDelete : trouve la ressource ET la supprime directement.

            if(deletedGarden) {
                // = Si une ressource avec cet id existait et a été supprimée => true
                return true
            } else { // Si elle n'existait pas, => false
                return false
            }
            // Dans le controller, ce booléen permettra de renvoyer un message 200 ou 204 si la suppression a réussi, ou un message 400 si la ressource n'existait pas.

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
};

module.exports = gardenService;