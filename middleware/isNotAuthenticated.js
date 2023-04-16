const isNotAuthenticated = (req, res, next) => {

    if(req.payload === undefined) {
        next();
    } else {
        res.status(400).json({ message: "You are already logged in!" })
    }

} 

module.exports = isNotAuthenticated;