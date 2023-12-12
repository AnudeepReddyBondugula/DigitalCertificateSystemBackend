const { getUser } = require("../../utils/helpers");

const signupHandler = async (req, res) => {
    try{
        const {username, role} = req.body;
        const user = await getUser({username}); //* Checking if any user Exists aldready
        if (user){
            console.log("[FAILED] User Aldready Exists!");
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }
        if (role === "user"){
            await createUser(req, res);
        }
        else if (role === "organization"){
            await createOrganizationUser(req, res);
        }
        else{
            res.status(403).json({
                message : "Unauthorized! [Unknown role]"
            })
        }
    } catch(err) {
        console.error("Error: " + err.message);
        res.status(500).json({
            message : "Internal Server Error!"
        })
    }
}

module.exports = {signupHandler}