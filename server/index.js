const express = require('express')
const bodyParser = require('body-parser')
const route = require('./api/index')
const app = express()
const router = express.Router();
const formidable = require('formidable');

app.set('port', (process.env.port || 3003))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

route(app)

app.post('/api/upload_file',(req,res)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = __dirname+'/..'+'/dist/static_upload/';//上传文件的保存路径
    form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.parse(req, (err, fields, files) => {
        if (err) {
          throw err;
        }
        if(files.file){
            var f_path = files.file.path;
            var absolute_path = f_path.substr(f_path.indexOf('/static_upload/'));
            console.log(absolute_path)
            res.send(absolute_path)
            // var absolute_path = f_path.substr(f_path.indexOf('\\static_upload'));
            // console.log( absolute_path)
            // res.send(absolute_path.split('\\').join('/'))
        }
    })
})



app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
})
