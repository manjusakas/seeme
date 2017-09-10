var mongoose = require('mongoose'),
    DB_URL = 'mongodb://127.0.0.1:27017/blog';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
}); 
/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});  

// var adminSchema = new mongoose.Schema({
//     name: String,
//     password: String,
// })

// var Models = {
//     admin: mongoose.model('admin', adminSchema),
// }
// var silence = new Models({ name: 'Silence' })
// console.log(silence.name) // 'Silence'

module.exports = mongoose

//module.exports = mongoose;