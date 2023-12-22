// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyUser = (req, res, next) => {
    try{

        // Destructuring the role from the request body
        const {role} = req.body.jwTokenData;

        // If role is user: Passing the control to the next middleware in the stack
        if(role === "user") next();

        // If not: Sending a status code along with an error message
        else{
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }
    } catch (err) {

        // Catching and handling the errors
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

// Exporting the onlyUser function to use it in the other parts of the application
module.exports = {onlyUser};
