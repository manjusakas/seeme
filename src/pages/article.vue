<template lang='jade'>
    div
        div.a_head
            h1(v-text='article_data.article_title')
        div.a_attach
            span.mr 分类:{{catalog_name}}
            span 编辑日期:{{article_data.article_date | time}}
            a.ml(v-if='hasLogin' href='javascript:void(0)' @click='delArticle()') 删除
            a.ml(v-if='hasLogin' href='javascript:void(0)' @click='toUpdateArticle()') 编辑
        div.a_body
            div(v-html="compiledMarkdown")
    
</template>
<script>
import marked from 'marked';

export default {
    data(){
        return {
            hasLogin: this.CookieHandle.getCookie('token'),
            menu_type: this.$route.matched[0].name,
            article_id: this.$route.query.id,
            catalog_name:'',
            article_data: {
                article_content:''
            },
        }
    },
    computed: {
        compiledMarkdown: function () {
            let _this = this;

            return marked(_this.article_data.article_content || '暂无内容', { sanitize: true })
        }
    },
    created () {
        this.dbtype = this.menu_type == 'project' ? 'prodocs' : (this.menu_type == 'article' ? 'articles' : '')
        this.getArticle();
    },
    watch : {
        "$route": function(to, from) {
            let toQuery = to.query;
            this.article_id = toQuery.id;
            this.getArticle();
            
        },
    },
    methods:{

        getAllCatalog: function(id){
            let _this = this;
            let dbtype = this.menu_type == 'project' ? 'prolists' : (this.menu_type == 'article' ? 'catalogs' : '')

            _this.$http.post('/api/get_catalog',{_id: id, dbtype: dbtype}).then(response => {
                _this.catalog_name = response.body[0].catalog_name;
                
            }, response => {
                // error callback
            });
        },
        getArticle: function(){
            let _this = this;
            _this.$http.post('/api/get_article',{_id: _this.article_id, dbtype: this.dbtype}).then(response => {
                _this.getAllCatalog(response.body.catalog_id);
                _this.article_data = response.body;
            }, response => {
                // error callback

            });
        },
        delArticle: function(){
            let _this = this;
            let msg = "您真的确定要删除吗？\n\n请确认！"; 
            if (confirm(msg)==true){ 
                _this.$http.post('/api/delete_article',{_id: _this.article_id, dbtype: this.dbtype}).then(response => {

                }, response => {
                    // error callback
                });
            }else{ 
                return false; 
            } 
        },
        toUpdateArticle: function(){
            this.$router.push({path:'update_article', query: { id: this.article_id}})
        }
        
    },
   
}
</script>
<style>
.a_attach{
    color: #999;
    font-size: 12px;
    margin: 10px 0px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
}
</style>