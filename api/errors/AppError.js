module.exports = class AppError extends Error {
    constructor (message, options) {
        // Calling parent constructor of base Error class.
        super(message);
        // Capturing stack trace, excluding constructor call from it.
        //Error.captureStackTrace(this, this.constructor);
        this.options = Object.assign({status:500}, options);
    }
};


