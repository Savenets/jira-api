module.exports = class ItemNotFound extends require('./AppError') {
    constructor (message = 'item not found', options) {
        super(message , options);
    }
};