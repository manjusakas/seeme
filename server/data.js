var mongoose = require('./db')

var adminsSchema = new mongoose.Schema({
    name: { type:String, unique: true },
    password: String,
})

var catalogSchema = new mongoose.Schema({
    catalog_name: { type:String, unique: true },
    authority: Number,
    //catalog_id: {type: Number, index: true , unique:true,default: 0}
})

//文章结构 ：查看，修改，增加，删除
var articleSchema = new mongoose.Schema({
    catalog_id: String,
    article_title: { type:String, unique: true },
    article_content: String,
    article_preview: String,  
    article_date: String,
    authority: Number,

})

var proListsSchema = new mongoose.Schema({
    catalog_name: { type:String, unique: true },
    authority: Number,
    //catalog_id: {type: Number, index: true , unique:true,default: 0}
})

var proDoc = new mongoose.Schema({
    catalog_id: String,
    article_title: String,
    article_content: String,
    article_preview: String,  
    article_date: String,
    authority: Number,
})

var Models = {
    admins: mongoose.model('admins', adminsSchema),
    catalogs: mongoose.model('catalogs', catalogSchema), 
    articles: mongoose.model('articles', articleSchema), 
    prolists: mongoose.model('prolists', proListsSchema),
    prodocs: mongoose.model('prodocs',proDoc)
}

module.exports = Models
