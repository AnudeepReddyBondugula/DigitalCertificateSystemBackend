function logger(req, req, next) {
    console.log(JSON.stringify(req.method) + "/" + (req.headers).host + req.path);
    next();
}

module.exports = {logger};