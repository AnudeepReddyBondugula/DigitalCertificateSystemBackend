const onlyOrganization = (req, res, next) => {
    const {role} = req.body;
    if (role === "organization") next();
    else{
        return res.status(403).json({
            message : "Unauthorized!"
        })
    }
};

module.exports = {onlyOrganization};