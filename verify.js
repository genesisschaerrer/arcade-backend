const jwt = require("jsonwebtoken")

module.exports = function(req, res, next){
    const token = req.cookies["token"]
    if(!token){
        return res.status(400).json({messege: "access denied"})
    } 

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.admin = verified 
        next()
    } catch (error) {
        res.status(400).json({messege: error.messege})
    }
}

