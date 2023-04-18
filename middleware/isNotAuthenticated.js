const jwt = require("jsonwebtoken");

const isNotAuthenticated = (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) {
                next();
            } else {
                console.log(decodedToken);
                res.status(400).json({message: "You are already Logged In!"})
            }
        });
        
    } else {
        next();
    }

} 

module.exports = isNotAuthenticated;