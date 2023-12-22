// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyUser = (req, res, next) => {
<<<<<<< HEAD
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
=======
    try{
        const {role} = req.body.jwTokenData;
        if(role === "user") next();
        else{
            return res.status(403).json({
                message : "Unauthorized!"
            });
        }
    } catch (err) {
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = {onlyUser};
>>>>>>> 7066c43c398a068efbc9367fb0443233e9b0c456
