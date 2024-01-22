// Defining a middleware function that takes three parameters: req (request), res (response) and next
function logger(req, res, next) {
    // Logging information about the incoming request to the console
    console.log(JSON.stringify(req.method) + "/" + (req.headers).host + req.path);

    // Passing the control to the next middleware in the stack
    next();
}

// Exporting the logger function to use it in the other parts of the application
module.exports = {logger};

