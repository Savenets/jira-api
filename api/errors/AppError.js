module.exports = class AppError extends Error {
    constructor (status) {
        // Calling parent constructor of base Error class.
        super();
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        this.name = 'CustomErrorHandler';
        this.status = status || 500;
        console.log( 'stauts is ' + this.status);
    }
};


