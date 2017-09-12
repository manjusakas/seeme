const express = require('express');
const router = express.Router();
const db = require('../data');





function getDbHandle(_type){
    return db[_type];
}



router.post('/api/getall_article', (req, res) => {
    var reqParams = req.body;
    var dbHandle = getDbHandle(reqParams.dbtype);
    if(reqParams.dbtype=='articles'){
        getAllArticle(dbHandle, reqParams);
    }else if(reqParams.dbtype=='prodocs'){
        getProdocLists(dbHandle);
    }
    function getProdocLists(dbHandle){
        dbHandle.find({}, (err, doc) => {
            if (err) {
                console.log('login find failed')
                res.json({code: 500, msg: '查询失败'});
            }
            res.send(doc);
        })
    }

    function getAllArticle(dbHandle, reqParams){
        var page=reqParams.page || 1;
        var rows=reqParams.rows || 20;

        var catalog_id=reqParams.catalog_id || '';

        console.log("page:"+page+",rows:"+rows);
         
        var query=dbHandle.find({}).sort({article_date: -1});
        query.skip((page-1)*rows);
        query.limit(rows);

        if(catalog_id){
            query.where('catalog_id',catalog_id);
        }

        //计算分页数据
        query.exec(function(err,rs){
            if(err){
                res.send(err);
            }else{
                //计算数据总数
                dbHandle.count({}, function(err, total){
                    var jsonArray={
                        data:rs, 
                        total: total || 0
                    };
                    res.send(jsonArray);
                })

            }
        });
    }
})


router.post('/api/get_article', (req, res) => {
    var reqParams = req.body;
    var dbHandle = getDbHandle(reqParams.dbtype);
    var articleId = reqParams._id ;
     
    var query=dbHandle.findById(articleId, function(err,rs){
        if(err){
            res.send(err);
        }else{
            res.send(rs);
        }
    });
})

router.post('/api/update_article', (req, res) => {
    var reqParams = req.body;
    var dbHandle = getDbHandle(reqParams.dbtype);
    var articleId = reqParams._id ;

    if(!(articleId)){
        delete reqParams._id;
        //增加
        console.log(reqParams);
        dbHandle.create(reqParams, function(dberr,dbres){
            if(dbres){
                console.log(dbres);
                res.send(dbres._id);
            }
        });
    }else{
        //修改
        dbHandle.findByIdAndUpdate(articleId, reqParams, function(dberr,dbres){
            if(dbres){
                res.send(dbres._id);
            }
        });
    }
})

router.post('/api/devare_article', (req, res) => {
    var reqParams = req.body;
    var dbHandle = getDbHandle(reqParams.dbtype);
    var articleId = reqParams._id ;
     
    var query=dbHandle.findByIdAndRemove(articleId, function(err,rs){
        if(err){
            res.send(err);
        }else{
            res.send(rs);
        }
    });
})




module.exports = router
