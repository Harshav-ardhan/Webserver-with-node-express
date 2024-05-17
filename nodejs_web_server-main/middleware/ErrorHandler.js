const logEvents = require('./logEvents')
const ErrorHandler = (err,req,res,next)=>{
    logEvents(`${err.name} ${err.message}` ,'errLog.txt')
    console.log(err.stack);
    res.status(500).send(err.message);
    next()
}
module.exports = {ErrorHandler}