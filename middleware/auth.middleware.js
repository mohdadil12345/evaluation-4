

require("dotenv").config()

const jwt = require("jsonwebtoken")
const { BlacklistModel } = require("../models/blacklist.model")


const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    try {
        let prev_token = await BlacklistModel.findOne({ blacklist: { $in: token } }) || false

        if (prev_token) {
            res.status(200).send("please login!!")

        } else {
           const decoded = jwt.verify(token, "masai")
             if(decoded){
                req.body.userID = decoded.userID
                req.body.name = decoded.name
             }
             next()
            
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    auth
}