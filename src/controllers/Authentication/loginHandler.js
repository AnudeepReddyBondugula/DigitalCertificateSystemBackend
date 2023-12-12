const { getUser } = require("../../utils/helpers");
const jwt = require("jsonwebtoken")
require("dotenv").config();

async function loginHandler(req, res) {
    console.log("POST : /login ");
    try{
        const {username, password} = req.body;
        if (!username || !password){
            console.log("[FAILED] Username or Password is empty!");
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }
        const user = await getUser({username, password});
        if (!user){
            console.log("[FAILED] Invalid Username or Password!");
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }

        const jwtoken = jwt.sign({username : user.username, role : user.role}, process.env.SECRET, {expiresIn : '1h'})
        res.status(200).json({
            jwtoken : jwtoken,
            role : user.role
        })
        console.log("[SUCCESS] Login Successfull !")
    }
    catch (err) {
        console.log("[FAILED] Error in Login : " + err);
        return res.status(500).json({
            message : "Interval Server Error!"
        })
    }
}

module.exports = {loginHandler};