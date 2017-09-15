 <template lang="jade">
    div#app
        div#menu.nav
            div.nav_top
                div.logo
                    img(src='./assets/na.png')
                h3() Nina
            div.nav_body
                ul
                    li(@click='m_lists' v-bind:class="{active: $route.matched[0].name== 'article'}")
                        i.fa.fa-book(title='文章' alt='文章')
                    li(@click='m_projects' v-bind:class="{active: $route.matched[0].name== 'project'}")
                        i.fa.fa-file-code-o(title='项目' alt='项目')
                    //- li(@click='m_me' v-bind:class="{active: $route.path== $route.matched[0].name== 'seeme'}")
                    //-     i.fa.fa-user-o(title='关于我')
            div.nav_footer
                button.default_btn(v-if='!hasLogin' @click='m_login') 登录
                button.cancle_btn(v-if='hasLogin' @click='m_logout') 退出
        .page_main
            components_catalog(:menu_type='menutype' v-if='menutype == "article" || menutype == "project"')

            router-view

</template>

<script>
var componentsCatalog = require('./components/catalog')
export default {
    name: 'app',
    data () {
        return {
            hasLogin: this.CookieHandle.getCookie('token'),
            menutype: this.$route.matched[0].name
        }
    },
    components: {
        'components_catalog' : componentsCatalog
    },
    mounted(){
    },
    watch : {
        "$route": function(to, from) {
            let toQuery = to.matched[0];
            this.menutype  = toQuery.name;
        },
    },
    methods: {
        // 文章列表路由
        m_lists: function(){
            this.$router.push('/')
        },
        // 项目列表路由
        m_projects: function(){
            this.$router.push('/pro_lists')
        },
        // 个人中心路由
        m_me: function(){
            this.$router.push('/hello')
        },
        // 登录
        m_login: function(){
            this.$router.push('/login')
        },
        // 登出
        m_logout: function(){
            //this.$router.push('/logout')
            this.CookieHandle.delCookie('token');
            window.location.reload();
        }
    },
}
</script>

<style lang='less'>
    @import './assets/_common';
    
    body {
        position: relative;
        margin: 0px;
        padding: 0px;
    }
    .page_main{
        padding-left: @nav_width;
    }
    .nav{
        width: @nav_width;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        border-right: 1px solid #f1f1f1;
        background-color: @nav_bg;
        color:@default_color;
        min-height: 500px;
        >div{
            text-align: center;
        }
        .nav_top{
            height: 140px;
            border-bottom: 1px solid @border_color;
            .logo{
                height: 60px;
                width: 60px;
                margin-top: 20px;
                display: inline-block;
                border: 4px solid @default_color;
                border-radius: 50%;
                img{
                    width:50px;
                    margin-top:6px;
                }
            }
        }
        .nav_body{
            ul{
                padding: 0px;
            }
            ul li{
                padding:30px 0px;
                list-style-type: none;
                &:hover{
                    cursor: pointer;
                    i{
                        color: @default_hover_color;
                        &:before{
                            border: 1px solid @default_hover_color;
                        }
                    }
                }
                &.active{
                    i{
                        color: @default_hover_color;
                        &:before{
                            border: 1px solid @default_hover_color;
                        }
                    }
                }
                i{
                    font-size: 24px;
                    &:before{
                        border: 1px solid @default_color;
                        border-radius: 50%;
                        padding: 12px;
                    }
                }
            }
        }
        .nav_footer{
            border-top: 1px solid @border_color;
            width: @nav_width;
            position: absolute;
            bottom: 0px;
            padding: 20px 0px;
            
        }
    }
    .ml{
        margin-left: 10px;
    }
    .mr{
        margin-right: 10px;
    }

    .main_body{
        margin-left: @sub_menu_width;
        position: relative;
        padding: 1px 40px;
        //width: 100%;
        
    }
    .default_btn{
        border: 0px;
        background: @default_color;
        color: #fff;
        border-radius: 2px;
        padding: 6px 14px;
        &:hover{
            cursor: pointer;
            background: @default_hover_color;
        }
        &:visited{
            boder:0px;
        }
    }

    .cancle_btn{
        border: 0px;
        background: @default_hover_color;
        color: #fff;
        border-radius: 2px;
        padding: 6px 14px;
        &:hover{
            cursor: pointer;
            background: #5378a2;
        }
        &:visited{
            boder:0px;
        }
    }

</style>
