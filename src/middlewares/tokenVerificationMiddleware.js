const { verifyToken } = require("../controllers/Authentication/verifyToken");

const tokenVerification = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                error : "Invalid Token"
            })
        }
        const jwTokenData = await verifyToken(token, process.env.SECRET);
        req.body.jwTokenData = jwTokenData;
        next();
    }
    catch(err){
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
          }
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        else return res.status(500).json({error : "Internal server error"});
    }
}

module.exports = {tokenVerification};