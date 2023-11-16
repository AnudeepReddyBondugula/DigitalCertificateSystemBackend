const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyOrganizationToken = async (req, res, next) => {
    try {
        if (!process.env.ORGANIZATION_SECRET){
            
            throw Error("No ORGANIZATION_SECRET in .env file");
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message : "Unauthorized!",
            })
        }

        jwt.verify(token, process.env.ORGANIZATION_SECRET, async (err, decoded) => {
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
        console.log("Error in Verifying Organization Token: ", err.message);
        res.status(500).json({
            message : "Internal Server Error!",
        })
    }
};

module.exports = verifyOrganizationToken;