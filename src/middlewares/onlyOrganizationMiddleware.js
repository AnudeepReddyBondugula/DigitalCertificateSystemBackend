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

module.exports = {onlyOrganization};