
const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
      
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          req.body.role = decoded.role;
          req.body.username = decoded.username;
          next();
        });
    }
    catch (err){
        return res.status(500).json({message : "Internal Server Error"});
    }
  };

  module.exports = {verifyToken};