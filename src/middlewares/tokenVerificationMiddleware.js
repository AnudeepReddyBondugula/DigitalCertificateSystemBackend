const { verifyToken } = require("../controllers/Authentication/verifyToken");

const tokenVerification = (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if (!token) {
            throw Error("Invalid Token");
        }
        const content = await verifyToken(token, process.env.SECRET);
        req.body.username = content.username;
        req.body.role = content.role;
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