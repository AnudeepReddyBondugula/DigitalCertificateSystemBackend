function logger(req, req, next) {
    console.log(JSON.stringify(req.method) + "/" + (req.headers).host + req.url);
    next();
}

module.exports = {logger};
