module.exports = class ServerError extends require('./AppError') {
    constructor (message, extra) {
        super(message || 'Something went wrong', 500);
        this.extra = extra;
    }
};