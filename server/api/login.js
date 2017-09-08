const express = require('express');
const router = express.Router();
const db = require('../data');
const crypto = require('crypto');

var createToken = function(name, pwd){
    var hash = crypto.createHash('md5');
    hash.update(name + pwd + new Date().getTime());
    return hash.digest('hex');
}

router.post('/api/login', (req, res) => {
    var reqParams = req.body;
    console.log('loginParams:',reqParams);
    db.admins.findOne({}, (err, doc) => {
        if (err) {
            console.log('login find failed')
            res.json({code: 500, msg: '查询失败'});
        }
        if(doc){
            if(doc.name === reqParams.name && doc.password === reqParams.password){
                res.cookie('username', reqParams.name);
                res.cookie('token', createToken(reqParams.name, reqParams.password), 600000);
                
                res.status(200).send({code: 0, msg: '登录成功'});
            }else{
                 res.status(400).send({code: 1, msg: '账号或密码错误'});
            }
        }
        


    })
})

module.exports = router
