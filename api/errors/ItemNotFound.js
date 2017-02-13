module.exports = class ItemNotFound extends require('./AppError') {
    constructor (extra) {
        super();
        this.extra = extra;
        console.error(extra);
    }
};