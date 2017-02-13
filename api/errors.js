//es 6 classes + check using infstanceof/
//custome error invalidREauest error

//1. three classes inheritance;

/*class AppError extends Error{
    constructor(err){
        this.err = err;
    }
    userNotFound(){
        console.log("error from appError");
        console.log(this.err);
    }
}

class Error1 extends AppError{

}
class Error2 extends AppError{

}*/

/*'use strict';

module.exports = function CustomError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
};

require('util').inherits(module.exports, Error);*/
