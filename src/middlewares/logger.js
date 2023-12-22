<<<<<<< HEAD
// Defining a middleware function that takes three parameters: req (request), res (response) and next
function logger(req, res, next) {
    // Logging information about the incoming request to the console
    console.log(JSON.stringify(req.method) + "/" + (req.headers).host + req.path);

    // Passing the control to the next middleware in the stack
    next();
}

// Exporting the logger function to use it in the other parts of the application
module.exports = {logger};
=======
function logger(req, req, next) {
    console.log(JSON.stringify(req.method) + "/" + (req.headers).host + req.url);
    next();
}

module.exports = {logger};
>>>>>>> a74540470ed7f292c1e4d2f2c62c089e399c24dc
