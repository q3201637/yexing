import Vue from 'vue'
import Router from 'vue-router'
import Code from '@/components/code'
import Wenben from '@/components/yemian/Wenben'
import Login from '@/components/yemian/Login'
import Register from '@/components/yemian/Register'
import HelloWorld from '@/components/HelloWorld'
import Zhuye from '@/components/yemian/Zhuye'
import text from '@/components/text'
import GerenDetail from '@/components/yemian/Geren_detail'
import none from '@/components/yemian/none'
import Chat from '@/components/yemian/Chat'
import text1 from '@/components/zujian/text1'
import Faxiandetail from '@/components/yemian/Faxiandetail'
import more from '@/components/yemian/more'
import ceshi from '@/components/ceshi'


Vue.use(Router)

export default new Router({
  /*mode: 'history',*/
  routes: [
    {
      path: '/',
      redirect:'/text1'
    },
    {
      path: '/none',
      name: 'none',
      component: none
    },
    {
      path: '/Faxiandetail',
      name: 'Faxiandetail',
      component: Faxiandetail
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    },
    {
      path: '/text1',
      name: 'text1',
      component: text1
    },
    {
      path: '/more',
      name: 'more',
      component: more
    },
    {
      path: '/Zhuye',
      name: 'Zhuye',
      component: Zhuye,
      meta: {
        keepAlive: true //此组件需要被缓存
      }
    },
    {
      path: '/text',
      name: 'text',
      component: text
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path:'/HelloWorld',
      name:'HelloWorld',
      component:HelloWorld,
    },
    {
      path:'/GerenDetail',
      name:'GerenDetail',
      component:GerenDetail
    },
    {
      path:'/Chat',
      name:'Chat',
      component:Chat
    }
  ]
})
