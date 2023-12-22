// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyOrganization = (req, res, next) => {
<<<<<<< HEAD
    
    // Destructuring the role from request object
    const {role} = req.body;

    // If role is organization: Passing the control to the next middleware in the stack
    if (role === "organization") next();
    else{
        // Returning a status code of 403 along with an error message
        return res.status(403).json({
            message : "Unauthorized!"
=======
    try{
        const {role} = req.body.jwTokenData;
        if (role === "organization") next();
        else{
            return res.status(403).json({
                error : "Unauthorized"
            })
        }
    } catch(err) {
        console.error("Error in onlyOrganizationMiddleware", err);
        return res.status(500).json({
            error : "Internal server error"
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
        })
    }
};

// Exporting the onlyOrganization function to use it in the other parts of the application
module.exports = {onlyOrganization};