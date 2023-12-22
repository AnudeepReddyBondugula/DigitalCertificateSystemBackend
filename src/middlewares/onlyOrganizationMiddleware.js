// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyOrganization = (req, res, next) => {
    
    // Destructuring the role from request object
    const {role} = req.body;

    // If role is organization: Passing the control to the next middleware in the stack
    if (role === "organization") next();
    else{
        // Returning a status code of 403 along with an error message
        return res.status(403).json({
            message : "Unauthorized!"
        })
    }
};

// Exporting the onlyOrganization function to use it in the other parts of the application
module.exports = {onlyOrganization};