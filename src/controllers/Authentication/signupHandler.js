const { getUser } = require("../../utils/helpers");
const {createUser} = require("../User/createUser");
const {createOrganizationUser} = require("../Organization/createOrganizationUser");

const signupHandler = async (req, res) => {
    try{
        const {username, role} = req.body;
        if (!(username && role)){
            throw Error(JSON.stringify({
                status : 403,
                message : "Required Fields Are Empty"
            }));
        }
        const user = await getUser({username}); //* Checking if any user Exists aldready
        if (user){
            console.log("[FAILED] User Already Exists!");
            throw Error(JSON.stringify({
                status : 403,
                message : "User Aldready Exists!"
            }));
        }
        if (role === "user"){
            await createUser(req.body);
        }
        else if (role === "organization"){
            await createOrganizationUser(req.body);
        }
        else{
            throw Error(JSON.stringify({
                status : 403,
                message : "Unknown Role"
            }));
        }
        res.status(201).json({
            message : "User Added Successfully!"
        })
        
    } catch(err) {
        const {status, message} = JSON.parse(err.message);
        console.error("Error: " + message);
        res.status(status).json({
            message
        })
    }
}

module.exports = {signupHandler}