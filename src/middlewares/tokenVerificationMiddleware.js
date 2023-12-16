const { verifyToken } = require("../controllers/Authentication/verifyToken");

const tokenVerification = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if (!token) {
            throw Error("Invalid Token");
        }
        const jwTokenData = await verifyToken(token, process.env.SECRET);
        req.body.jwTokenData = jwTokenData;
        next();
    }
    catch(err){
        if (err.message === 'Invalid Token'){
            return res.status(403).json({message : "Unauthorized"});
        }
        else return res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = {tokenVerification};