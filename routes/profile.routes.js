const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");

const User = require('../models/User.model');

const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/users/:userId - get info of a specific user
router.get('/users/:userId', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };

    User.findById(userId)
        .then( userFromDB => {
            res.json(userFromDB);
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error getting the user from the DB',
                error: err
            });
        }
    );
});

// PUT /api/users/:userId - edit user info
router.put('/users/:userId', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified ID is not valid!'} );
        return;
    };

    const { imageUrl } = req.body;
    let updatedData;

    if(imageUrl) {
        updatedData = {imageUrl};
        User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then( updatedUser => {
            res.status(200).json(updatedUser)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error updating profile picture!!!',
                error: err
            })
        }
    );
    } 

})

module.exports = router;