// Defining a middleware function that takes three parameters: req (request), res (response) and next
const onlyOrganization = (req, res, next) => {
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
        })
    }
};

// Exporting the onlyOrganization function to use it in the other parts of the application
module.exports = {onlyOrganization};