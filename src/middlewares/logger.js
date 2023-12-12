function logger(req, req, next) {
    console.log(JSON.stringify(req.headers) + " path: " + req.path);
    next();
}

module.exports = {logger};