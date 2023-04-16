const isNotAuthenticated = (req, res, next) => {

    if(req.payload === undefined) {
        next();
    } else {
        console.log(req.payload);
        res.status(400).json({ message: "You are already logged in!" })
    }

} 

module.exports = isNotAuthenticated;