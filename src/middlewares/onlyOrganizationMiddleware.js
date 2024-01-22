// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyOrganization = (req, res, next) => {
    try{

        // Destructuring the role from the request body
        const {role} = req.body.jwTokenData;

        // If role is organization: Passing the control to the next middleware in the stack
        if (role === "organization") next();

        // If not: Sending a status code along with an error
        else{
            return res.status(403).json({
                error : "Unauthorized"
            })
        }
    } catch(err) {

        // Catching and handling the errors
        console.error("Error in onlyOrganizationMiddleware", err);
        return res.status(500).json({
            error : "Internal server error"
        })
    }
};

// Exporting the onlyOrganization function to use it in the other parts of the application
module.exports = {onlyOrganization};