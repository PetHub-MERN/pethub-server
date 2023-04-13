const express = require("express");
const router = express.Router();

// require the adoption model to interact with it on the DB
const Adoption = require("../models/Adoption.model");

// require this middleware function to protect routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const isOwner = require("../middleware/isOwner");
const { payloadDecoder } = require("../utils/payloadDecoder");
const { default: mongoose } = require("mongoose");

// POST /api/adoptions - create a new adoption
router.post('/adoptions', isAuthenticated, (req, res, next) => {
    const { location, description, pets } = req.body;

    // get current user id from the headers
    const userData = payloadDecoder(req.headers.authorization);

    Adoption.create({ location, description, pets, announcer: userData._id})
        .then( response => {
            res.status(201).json(response);
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error creating the adoption.',
                error: err
            })
        }
    );
});

// GET /api/adoptions - get a list of all the adoptions
router.get('/adoptions', (req, res, next) => {
    Adoption.find()
        .populate('announcer')
        .then( adoptionsFromDB => {
            res.status(200).json(adoptionsFromDB)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error getting the list of adoptions from the DB',
                error: err
            })
        }
    );
});

// GET /api/adoptions/:adoptionId - get info of a specific adoption
router.get('/adoptions/:adoptionId', isAuthenticated, (req, res, next) => {
    const { adoptionId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(adoptionId)) {
        res.status(400).json({ message: 'Specified ID is not valid.' })
    };

    Adoption.findById(adoptionId)
        .populate('announcer')
        .then( adoptionFromDB => {
            res.status(200).json(adoptionFromDB)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error getting the adoption from the DB',
                error: err
            })
        }
    );
});

// PUT /api/adoptions/:adoptionId - edit the info of a specific adoption
router.put('/adoptions/:adoptionId', isAuthenticated, isOwner, (req, res, next) => {
    const { adoptionId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(adoptionId)) {
        res.status(400).json({ message: 'Specified ID is not valid.' })
    };

    Adoption.findByIdAndUpdate(adoptionId, req.body, { new: true })
        .then( updatedAdoption => {
            res.status(200).json(updatedAdoption)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error editing the adoption!',
                error: err
            })
        }
    );
});

// DELETE /api/adoptions/:adoptionId - remove a specific adoption
router.delete('/adoptions/:adoptionId', isAuthenticated, isOwner, (req, res, next) => {
    const { adoptionId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(adoptionId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };

    Adoption.findByIdAndDelete(adoptionId)
        .then(() => {
            res.status(200).json(`Adoption with ID ${adoptionId} successfully deleted`);
        }).catch((err) => {
            res.status(500).json({
                message: "Error deleting pet!",
                error: err
            });
        }
    );
});

module.exports = router;