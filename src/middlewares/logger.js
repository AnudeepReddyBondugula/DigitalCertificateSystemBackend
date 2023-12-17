function logger(req, res, next) {
    console.log(req.method + "  /" + (req.headers).host + req.url);
    next();
}

module.exports = {logger};
