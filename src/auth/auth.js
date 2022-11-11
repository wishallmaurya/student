// const userModel = require("../model/user")
const jwt = require("jsonwebtoken")


const authentication = async (req,res,next) => {
    try {
        const token = req.headers.authentication 
        // console.log(token)
        const tokenCheck = jwt.verify(token, "secret-key")
        req.userId = tokenCheck.userId
        next()

    } catch (error) {
        res.send(error)
    }
}

module.exports = {authentication}
