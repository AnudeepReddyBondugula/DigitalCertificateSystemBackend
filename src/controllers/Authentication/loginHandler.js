const { getUser } = require("../../utils/helper");
const {generateToken} = require("./generateToken");
require("dotenv").config();

async function loginHandler(req, res) {
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
        const role = user.role;
        const jwtoken = generateToken({username, role}, process.env.SECRET)

        res.status(200).json({
            jwtoken,
            role
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