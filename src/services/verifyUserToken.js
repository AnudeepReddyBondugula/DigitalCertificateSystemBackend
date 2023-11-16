const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUserToken = async (req, res, next) => {
    try {
        if (!process.env.USER_SECRET){
            
            throw Error("No USER_SECRET in .env file");
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message : "Unauthorized!",
            })
        }

        jwt.verify(token, process.env.USER_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message : "Unauthorized!",
                })
            }
            else{
                req.decoded = decoded;
                next();
            }
          });

    }catch(err){
        console.log("Error in Verifying User Token: ", err.message);
        res.status(500).json({
            message : "Internal Server Error!",
        })
    }
};

module.exports = verifyUserToken;