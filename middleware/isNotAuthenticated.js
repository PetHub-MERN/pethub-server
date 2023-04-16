const isNotAuthenticated = (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

        res.status(400).json({message: "You are already Logged In!"})
        
    } else {
        next();
    }

} 

module.exports = isNotAuthenticated;