const onlyUser = (req, res, next) => {
    // TODO : Need to implement
    const {role} = req.body;

    if(role === "user") next();
    else{
        return res.status(403).json({
            message : "unauthorized!"
        })
    }
};

module.exports = {onlyUser};