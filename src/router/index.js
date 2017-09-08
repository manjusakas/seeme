import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login';

import Kong from '@/pages/kong';
//article
import ArticleLists from '@/pages/article_lists';
import Article from '@/pages/article';
import UpdateArticle from '@/pages/update_article';

Vue.use(Router)

var router = new Router({
  routes: [
    {
      //文章列表
      path: '/',
      name: 'article',
      component: Kong,
      children: [
        {
          //增加/修改文章
          path: '/',
          name: 'article_lists',
          component: ArticleLists
        },
        {
          //增加/修改文章
          path: '/update_article',
          name: 'update_article',
          component: UpdateArticle
        },
        {
          //查看文章
          path: '/article',
          name: 'article',
          component: Article
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pro_lists',
      name: 'project',
      component: Kong,
      children: [
        {
          //增加/修改文章
          path: '/pro_lists/update_article',
          name: 'update_prodoc',
          component: UpdateArticle
        },
        {
          //查看文章
          path: '/pro_lists/article',
          name: 'article',
          component: Article
        },
      ]      
    },
    {
      path: '/hello',
      name: 'seeme',
    },
    
  ]
});


export default router