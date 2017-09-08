<template lang='jade'>
    div
        div.sub_menu
            .sub_top
                span 分类列表
                a.fa.fa-plus(v-if='editable' title='添加分类' @click='addCatalog')
                a.fa.fa-pencil(v-if='hasLogin && !editable' title='修改分类列表' @click='editable=true')
            .sub_body
                ul
                    li(v-if='menu_type == "article" '  )
                        span(v-bind:class='{active_list: current_catalog == "all"}' @click='switchCatalog("all",1)') 全部
                    li(v-for='tag in catalog_lists' ) 
                        span(@click='switchCatalog(tag._id,1)' v-bind:class='{active_list: tag.catalog_id == current_catalog}' ) {{tag.catalog_name}}
                        i.c_edit.fa.fa-plus(v-if='editable' title='添加文档' @click='addDoc(tag._id)')
                        i.mr.c_edit.fa.fa-pencil(v-if='editable && menu_type=="project"' @click='editCatalog(tag)')

                        ul(v-if='menu_type=="project"')
                            li(v-for='doc in prodoc_lists' v-if='doc.catalog_id == tag._id')
                                span(v-text='doc.article_title' @click='toProdoc(doc._id)')

            .sub_footer
                button.cancle_btn(v-if='editable' @click='editable=!editable') 取消
                button.default_btn(v-if='hasLogin && !editable && menu_type == "article"' @click='toAddArticle' ) 写文章

        div.modal_out(v-if='showModal')
            div.modal
                div.modal_header
                    h3 修改文章类别
                div.modal_body
                    input(v-model='editing_catalog_name')
                    button(@click='saveUpdateCatalog') 保存
                    button(@click='showModal=!showModal') 关闭

</template>



<script type="text/javascript">

export default {
    name: 'catalog',
    props: ['menu_type'],
    data() {
        return {
            hasLogin: this.CookieHandle.getCookie('token'),
            editable: false,
            current_catalog:'all',

            catalog_lists:[],
            prodoc_lists: [],
            
            showModal: false,
            editing_catalog_name:'',
        }
    },
    created () {
        this.dbtype = this.menu_type == 'project' ? 'prolists' : (this.menu_type == 'article' ? 'catalogs' : '')
        this.getAllCatalog();

    },
    watch: {
        menu_type: function(to, from){
            this.editable = false;
            this.showModal = false;
            this.dbtype = to == 'project' ? 'prolists' : (to == 'article' ? 'catalogs' : '')
            this.getAllCatalog();

        }
    },
    methods:{
        getAllCatalog: function(){
            let _this = this;
            _this.$http.post('/api/get_catalog', {dbtype: this.dbtype}).then(response => {
                _this.catalog_lists = response.body;
                if(this.menu_type == 'project'){
                    this.getALlDocLists()
                }
            }, response => {
                // error callback
            });
        },
        getALlDocLists: function(){
            this.$http.post('/api/getall_article',{dbtype:'prodocs'}).then(response => {
                this.prodoc_lists = response.body;
            }, response => {

            })
        },
        addCatalog: function(){
            this.showModal=true;
            this.editing_catalog_id = '';
            this.editing_catalog_name = '';
        },
        editCatalog: function(tag){

            this.showModal=true;
            this.editing_catalog_id = tag._id;
            this.editing_catalog_name = tag.catalog_name;
        },
        addDoc: function(_id){
            this.$router.push({path:'/pro_lists/update_article', query:{catalogid: _id}})
        },
        saveUpdateCatalog: function(){
            let _this = this;
            let postData = {
                _id: this.editing_catalog_id,
                catalog_name: this.editing_catalog_name,
                dbtype: this.dbtype,
            }
            if(!this.editing_catalog_id){
                delete postData._id
            }
            this.$http.post('/api/update_catalog',postData).then(response => {
                _this.getAllCatalog()
                _this.showModal=false;
            }, response => {

            })
        },
        switchCatalog: function(id, cpage){
            if(this.menu_type == 'article'){
                this.editable = false;

                this.current_catalog = id;
                this.$router.push({path: '/', query: {catalogid: id}})
            }
        },
        toAddArticle: function(){
            this.$router.push('update_article')
        },
        toProdoc: function(_id){
            this.editable = false;

            this.$router.push({path:'/pro_lists/article', query:{id: _id}})
        }
        
    }
}
</script>

<style lang='less'>
    @import '../assets/_common';

    .sub_menu{
        width: @sub_menu_width;
        border-right: 1px solid #f1f1f1;
        height: 100%;
        position: fixed;
        color: @default_hover_color;
        overflow-y: auto;
    }
    .sub_top{
        height: 10vh;
        line-height: 10vh;
        border-bottom: 1px solid #f1f1f1;
        padding: 0px 20px;
        font-weight: bold;
        position: relative;
        a{
            line-height: 10vh;
            float: right;
            color: @default_hover_color;
            font-size: 20px;
            margin-left: 10px;
            &:hover{
                cursor: pointer;
                color: @default_color;
                font-size: 22px;
            }
        }
    }
    .sub_body{
        //height: 80vh;
        padding: 0px 20px;
        //overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
        ul{
            margin-bottom: 20px;
        }
        ul li{
            padding: 12px 10px;
            border-bottom: 1px solid #f1f1f1;
            font-size: 14px;
            span:hover{
                cursor: pointer;
                color: @default_color;
            }
            & .active_list{
                color: @default_color;
            }
            .c_edit{
                float: right;
                &:hover{
                    cursor: pointer;
                    color: @default_color;
                }
            }
        }
        
    }
    .sub_footer{
        text-align: center;
    }
    .modal_out{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 7000;
        .modal{
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.8);
            background: #fff;
            top: 50%;
            left: 50%;
            position: fixed;
            padding: 40px;
            transform: translate(-50%,-50%);
            border-radius: 4px;
        }
    }
</style>