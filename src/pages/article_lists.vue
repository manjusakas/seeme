<template lang='jade'>
    div.article_lists
        div(v-if='art_lists.length')
            div.list(v-for='(lists,index) in art_lists' )
                h1.a_title(v-text='lists.article_title' @click='toArticle(lists._id)')
                div.a_date
                    span.mr 编辑日期: {{lists.article_date | time}}
                    a.mr(href='javascript:void(0)' v-if='hasLogin' @click='toUpdateArticle(lists._id)') 编辑
                    a(href='javascript:void(0)' v-if='hasLogin' @click='toDelArticle(lists._id)') 删除
                div.a_body(v-compiledMarkdown='lists.article_content')
                
        span(v-if='!art_lists.length') 该分类下没有文章
        //pagination
</template>



<script type="text/javascript">
import marked from 'marked';

export default {
    name: 'lists',
    data() {
        return {
            hasLogin: this.CookieHandle.getCookie('token'),
            current_catalog: this.$route.query.catalogid || 'all',
            catalog_lists:[],
            art_lists: []
        }
    },
    created () {
        this.getAllArticleLists();
    },
    directives: {
        compiledMarkdown: {
            bind: function(el,binding){
                el.innerHTML = marked(binding.value).substr(0,300)
            }
        }
    },
    components: {
        //'components_catalog' : componentsCatalog
    },
    watch : {
        "$route": function(to, from) {
            let toQuery = to.query;
            this.current_catalog  = toQuery.catalogid || 'all';  
            this.getAllArticleLists();  
        },
    },
    methods:{
        getAllArticleLists: function(cpage){
            let _this = this;
            let postData = {
                catalog_id: this.current_catalog,
                dbtype: 'articles'
            }
            
            if(this.current_catalog == 'all'){
                delete postData.catalog_id
            }
            _this.$http.post('/api/getall_article',postData).then(response => {
                let resData = response.body;
                _this.art_lists = resData.data;
                
            }, response => {
                // error callback
            });
        },
        
        toArticle: function(id){
            this.$router.push({path: 'article', query: {id: id} } );
        },
        toUpdateArticle: function(id){
            this.$router.push({path: 'update_article', query: {id: id} } );
        },
        toDelArticle: function(id){
            let _this = this;
            let msg = "您真的确定要删除吗？\n\n请确认！"; 
            if (confirm(msg)==true){ 
                _this.$http.post('/api/delete_article',{_id: id, dbtype:'articles'}).then(response => {
                    _this.getAllArticleLists(1);
                }, response => {
                    // error callback
                });
            }else{ 
                return false; 
            } 
        }

    }
}
</script>

<style lang='less'>
    @import '../assets/_common';

    
        .article_lists{
            color: @default_hover_color;

            .a_title{
                font-size: 26px;
                &:hover{
                    color: @default_hover_color;
                    cursor: pointer;
                }
            }
            .a_date{
                font-size: 12px;
                color: #999;
                // margin-top: 10px;
                // display: block;
            }
            .a_body{
                margin-top: 10px;
                ul,ol{
                    padding-left: 20px;
                }
            }
            .list{
                border-bottom: 1px solid #eaeaea;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
        }
        
    
</style>