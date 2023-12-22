// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyUser = (req, res, next) => {
    // TODO : Need to implement

    // Destructuring the role from the request object
    const {role} = req.body;

    // If role is user: Passing the control to the next middleware in the stack
    if(role === "user") next();
    else{

        // Returning a status code of 403 along with an error message
        return res.status(403).json({
            message : "unauthorized!"
        })
    }
};

// Exporting the onlyUser function to use it in the other parts of the application
module.exports = {onlyUser};