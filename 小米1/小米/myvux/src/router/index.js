//  导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入路径所对应的组件
import HomeIndex from '../views/HomeIndex'
import HomeSearch from '../views/HomeSearch'
import HomeLogin from '../views/HomeLogin'
import HomeRegister from '../views/HomeRegister'
import HomeClassify from '../views/HomeClassify'
import ShopCart from '../views/ShopCart'
import HomeMine from '../views/HomeMine'
import HomeSetting from '../views/HomeSetting'
import HomeAddress from '../views/HomeAddress'
import NewAddress from '../views/NewAddress'
import HomeDetails from '../views/HomeDetails'
import HomeFabu from '../views/HomeFabu'
import HomeEdit from '../views/HomeEdit'
import HomeAddEdit from '../views/HomeAddEdit'
import HomeOrder from '../views/HomeOrder'
import HomeSale from '../views/HomeSale'
import HomeSettlement from '../views/HomeSettlement'
import OrderFinish from '../views/OrderFinish'
import Personal from '../views/Personal'
import HomeWait from '../views/HomeWait'
import HomeAllList from '../views/HomeAllList'
import HomeReplys from '../views/HomeReplys'
import HomeReply from '../views/HomeReply'
import HomeCollect from '../views/HomeCollect'
import HomeMessage from '../views/HomeMessage'
import ceshi from '../views/ceshi'

Vue.use(VueRouter);
// 路由配置
const routes = [
  {
    path: '/',
    name:'hello',
    component: HomeIndex
  },
  {
    path:'/search',
    component:HomeSearch
  },
  {
    path:'/login',
    component:HomeLogin
  },
  {
    path:'/register',
    component:HomeRegister
  },
  {
    path:'/classify',
    component:HomeClassify
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/mine',
    component:HomeMine
  },
  {
    path:'/setting',
    component:HomeSetting
  },
  {
    path:'/address',
    component:HomeAddress
  },
  {
    path:'/details/:id',
    component:HomeDetails
  },
  {
    path:'/fabu',
    component:HomeFabu
  },
  {
    path:'/edit/:id',
    component:HomeEdit
  },
  {
    path:'/newaddress',
    component:NewAddress
  },
  {
    path:'/addressEdit/:index',
    component:HomeAddEdit
  },
  {
    path:'/myorder',
    component:HomeOrder
  },
  {
    path:'/mysale',
    component:HomeSale
  },
  {
    path:'/settlement',
    component:HomeSettlement
  },
  {
    path:'/finish',
    component:OrderFinish
  },
  {
    path:'/personal',
    component:Personal
  },
  {
    path:'/waitOrder',
    component:HomeWait
  },
  {
    path:'/allList',
    component:HomeAllList
  },
  {
    path:'/allreply/:id',
    component:HomeReplys
  },
  {
    path:'/reply/:id',
    component:HomeReply
  },
  {
    path:'/collect',
    component:HomeCollect
  },
  {
    path:'/message',
    component:HomeMessage
  },
  {
    path:'/ceshi',
    component:ceshi
  }

]
// 导出实例
export default new VueRouter({
    routes
})
