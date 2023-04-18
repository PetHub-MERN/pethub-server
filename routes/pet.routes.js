const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");

// require the pet model to interact with it on the DB
const Pet = require("../models/Pet.model");

// require this middleware function to protect routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const isOwner = require("../middleware/isOwner");

// require function to decode the payload and get user data
const { payloadDecoder } = require("../utils/payloadDecoder");
const Adoption = require("../models/Adoption.model");

// POST /api/pets - create a new pet
router.post('/pets', isAuthenticated, (req, res, next) => {

    const { name, dateOfBirth, species, breed, description, imageUrl } = req.body;

    // get the current user id from the headers
    const userData = payloadDecoder(req.headers.authorization)

    let newPet;

    if(imageUrl === null) {
        newPet = {
            name, 
            dateOfBirth,
            species,
            breed,
            description,
            owner: userData._id 
        };
    } else {
        newPet = {
            name, 
            dateOfBirth,
            species,
            breed,
            description,
            imageUrl,
            owner: userData._id 
        };
    }

    Pet.create(newPet)
        .then( response => {
            res.status(201).json(response);
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error creating a new pet in the DB!',
                error: err
            });
        }
    );
});

// GET /api/pets - get a list of all pets
router.get('/pets', (req, res, next) => {
    Pet.find()
        .populate('owner')
        .then( petsFromDB => {
            res.status(200).json(petsFromDB)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error getting the list of pets from the DB!',
                error: err
            })
        }
    );
});

// GET /api/pets/:petId - get the info of a specific pet
router.get('/pets/:petId', isAuthenticated, (req, res, next) => {
    const { petId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };

    Pet.findById(petId)
        .populate("owner")
        .then((petFromDB) => {
            res.json(petFromDB);
        }).catch((err) => {
            res.status(500).json({
                message: 'Error getting pet from the DB!',
                error: err
            })
        }
    );
});

// PUT /api/pets/:petId - edit the info of a specific pet
router.put('/pets/:petId', isAuthenticated, isOwner, (req, res, next) => {
    const { petId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };

    Pet.findByIdAndUpdate(petId, req.body, { new: true })
        .then( updatedPet => {
            res.status(200).json(updatedPet)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error editing the pet!',
                error: err
            })
        }
    );
});

// DELETE /api/pets/:petId - delete a specific pet from the DB
router.delete('/pets/:petId', isAuthenticated, isOwner, async (req, res, next) => {
    
    const { petId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };
    
    try{

        const deletedPet = await Pet.findByIdAndDelete(petId);
        const deletedPetAdoptions = await Adoption.find({pets: {$in: deletedPet._id}});
        
        deletedPetAdoptions.forEach( async (adoption) => {

            try{
                const petIndex = adoption.pets.indexOf(deletedPet._id);
                const updatedPets = [...adoption.pets];
                updatedPets.splice(petIndex, 1);

                await Adoption.findByIdAndUpdate(adoption._id, {pets: updatedPets});

                const updatedAdoption = await Adoption.findById(adoption._id);

                if(updatedAdoption.pets.length === 0) {
                    await Adoption.findByIdAndDelete(updatedAdoption._id);
                }

            } catch(err){
                console.error(err);
            }

        });

        res.status(200).json(`Pet with ID ${petId} successfully deleted`);
            
    } catch(err) {
        res.status(500).json({
            message: "Error deleting pet!",
            error: err
        });
    }
});


module.exports = router;