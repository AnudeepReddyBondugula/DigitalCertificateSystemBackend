const { getUser } = require("../../utils/helper");
const {createUserHandler} = require("../User/createUserHandler");
const {createOrganizationUserHandler} = require("../Organization/createOrganizationUserHandler");

const signupHandler = async (req, res) => {
    try{
        const {username, role} = req.body;
        if (!(username && role)){
            return res.status(400).json({
                error : "Required fields are empty"
            })
        }
        const user = await getUser({username}); //* Checking if any user Exists aldready
        if (user){
            return res.status(409).json({
                error : "Username already exists"
            });
        }
        if (role === "user"){
            return createUserHandler(req, res);
        }
        else if (role === "organization"){
            return createOrganizationUserHandler(req, res);
        }
        else{
            return res.status(400).json({
                error : "Unknown Role"
            })
        }
    } catch(err) {
        console.error("Error in SignUp: " + err);
        res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {signupHandler}