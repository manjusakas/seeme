<template lang='jade'>
    div
        div.title
            input(type='text',placeholder='文章标题', v-model= 'article_title')
            select(v-if='menu_type == "article"' v-model = 'selected_catalogid')
                option(v-for='tag in catalog_lists' v-bind:value='tag._id') {{tag.catalog_name}}
            button(type='button' @click='updateArticle()') 保存

        mavon-editor(ref="editor" v-model='article_content',  @imgAdd="$imgAdd" @imgDel="$imgDel" )
        //:toolbars="toolbars"
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'editor',
    data(){
        return {
            menu_type: this.$route.matched[0].name,
            article_id: this.$route.query.id || null,
            article_content: '',
            article_title:'',
            selected_catalogid:'',
            catalog_id: this.$route.query.catalogid || null,
            catalog_lists:[],

            img_file: {},
            toolbars: {
                strikethrough: true, // 中划线
                mark: true, // 标记
                quote: true, // 引用
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                trash: true, // 清空
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                help: true, // 帮助
                preview: true, // 预览
                subfield: true, // 是否需要分栏
              }
        }
    },
    components: {
        mavonEditor
    },
    created () {
        this.dbtype = this.menu_type == 'project' ? 'prodocs' : (this.menu_type == 'article' ? 'articles' : '')
        this.getAllCatalog()
        this.article_id ? this.getArticle() : ''    
    },
    // mounted: function() {
    //     this.$refs.editor.$imgUpdateByUrl(response.body)
    // },
    methods:{
        getAllCatalog: function(){
            let _this = this;
            _this.$http.post('/api/get_catalog',{dbtype:'catalogs'}).then(response => {
                _this.catalog_lists = response.body;
                
            }, response => {
                // error callback
            });
        },
        updateArticle: function(){
            let _this = this;
            let dbtype = 'articles'
            let postData = {
                catalog_id: this.catalog_id || _this.selected_catalogid,
                _id: _this.article_id || null,
                article_title: _this.article_title,
                article_content: _this.article_content,
                article_date: new Date().getTime(),
                dbtype: this.dbtype
            }

            _this.$http.post('/api/update_article', postData).then(response => {
                //_this.catalog_lists = response.body;
                _this.$router.push({ path: 'article', query: { id: response.body}})

            }, response => {
                // error callback
            });
        },
        getArticle: function(){
            let _this = this;
            _this.$http.post('/api/get_article',{_id: _this.article_id, dbtype: this.dbtype}).then(response => {
                let reqData = response.body;
                _this.article_content = reqData.article_content
                _this.article_title = reqData.article_title
                _this.selected_catalogid = reqData.catalog_id
            }, response => {
                // error callback
            });
        },
        $imgAdd(pos, $file){
            var _this = this;
            this.img_file[pos] = $file;

            // FormData 对象
            var form = new FormData();
            form.append("file", $file);                           // 文件对象
            // XMLHttpRequest 对象
            this.$http.post('/api/upload_file',form).then(
                response => {
                    _this.$refs.editor.$img2Url(pos,response.body)
                },response => {

                })

        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
            
        },
    }
    
}

</script>
<style>

</style>