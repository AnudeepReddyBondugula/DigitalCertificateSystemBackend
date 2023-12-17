const onlyUser = (req, res, next) => {
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
