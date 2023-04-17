const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");

const User = require('../models/User.model');

const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner");

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

    User.findByIdAndUpdate(userId, req.body, { new: true })
        .then( updatedUser => {
            res.status(200).json(updatedUser)
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error editing the pet!',
                error: err
            })
        }
    );
})

module.exports = router;