const Pet = require("../models/Pet.model");
const Adoption = require("../models/Adoption.model");

const isOwner = (req, res, next) => {

    const {petId, adoptionId} = req.params;
    const userId = req.payload._id;

    if(petId) {
        Pet.findById(petId)
            .populate("owner")
            .then((pet) => {
                if(pet.owner._id.toString() === userId) {
                    next();
                } else {
                    res.status(401).json({ message: "You don't have permission to perform that action!" });
                }
            }).catch((err) => {
                res.status(500).json({
                    message: "Couldn't find pet in DB!",
                    error: err
                });
            }
        );
    };

    if(adoptionId) {
        Adoption.findById(adoptionId)
            .populate('announcer')
            .then( adoption => {
                if(adoption.announcer._id === userId) {
                    next();
                } else {
                    res.status(401).json({ message: "You don't have permission to perform that action!" })
                }
            })
            .catch( err => {
                res.status(500).json({
                    message: "Couldn't find adoption in DB!",
                    error: err
                })
            }
        );
    }
}

module.exports = isOwner;

