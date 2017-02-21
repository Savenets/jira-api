module.exports = class ServerError extends require('./AppError') {
    constructor (message = 'something went wrong', options) {
        super(message , options);
    }
};