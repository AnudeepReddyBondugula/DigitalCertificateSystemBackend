const jwt = require("jsonwebtoken");

const generateToken = (content, secret) => {
    const jwtoken = jwt.sign(content, secret, {expiresIn : "1h"});
    return jwtoken;
}

module.exports = {generateToken};