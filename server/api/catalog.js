const express = require('express');
const router = express.Router();
const db = require('../data');

function getDbHandle(_type){
    return db[_type];
    //catalogs  prolists
}

router.post('/api/get_catalog', (req, res) => {
    var reqParams = req.body;
    //state: "publish"
    var dbHandle = getDbHandle(reqParams.dbtype);
    var postData = reqParams._id ? {_id: reqParams._id} : {};
    dbHandle.find(postData, (err, doc) => {
        if (err) {
            console.log('login find failed')
            res.json({code: 500, msg: '查询失败'});
        }
        //console.log(reqParams.dbtype)

        if(!doc.length && reqParams.dbtype == 'catalogs'){
            dbHandle.create({'catalog_name':'未分类'},function(dberr,dbres){
                if(dbres){
                    res.send([dbres]);
                }
            });
        }else{
            res.send(doc);
        }
        return;
    })
})

router.post('/api/update_catalog', (req, res) => {
    var reqParams = req.body;
    var dbHandle = getDbHandle(reqParams.dbtype);

    if(reqParams._id){
        dbHandle.findByIdAndUpdate(reqParams._id, reqParams, function(dberr,dbres){
            if(dbres){
                console.log('update_catalog', dbres);
                res.send(dbres._id);
            }
        });
    }else{
        // var postData = {
        //     catalog_name: reqParams.catalog_name,
        // }
        // console.log('----------',reqParams);
        dbHandle.create(reqParams, function(dberr,dbres){
            console.log(dberr,dbres);
            if(reqParams.dbtype=='prolists'){
                addDefaultProArticle(db.prodocs ,dbres._id);
            }
            res.send(dbres);
        });
    }
    
})


function addDefaultProArticle(_dbHandle, _catalog_id){
    var postData = [
        {
            catalog_id: _catalog_id,
            article_title: '概要设计',
            article_date: new Date().getTime(),
        },
        {
            catalog_id: _catalog_id,
            article_title: '详细设计',
            article_date: new Date().getTime(),
        },
        {
            catalog_id: _catalog_id,
            article_title: '源码',
            article_date: new Date().getTime(),
        },
        {
            catalog_id: _catalog_id,
            article_title: 'README',
            article_date: new Date().getTime(),
        },
    ]
    _dbHandle.create(postData, function(dberr,dbres){
            console.log(dberr,dbres);
            //res.send(dbres);
    });
}

module.exports = router
