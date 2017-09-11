//const login = require('./login')
const catalog = require('./catalog')
const article = require('./article')


module.exports = function(app){
    //app.use(login)
    app.use(catalog)
    app.use(article)

}