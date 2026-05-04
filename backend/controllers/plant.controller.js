const {Request, Response} = require('express');

const plantController = {
    /**
     * @param {Request} req 
     * @param {Response} res
     */
    getAll : async(req, res) => {
        res.send(501)
    },

    /**
     * @param {Request} req 
     * @param {Response} res
     */
    getById : async(req, res) => {
        res.send(501)
    }

}

module.exports = plantController;