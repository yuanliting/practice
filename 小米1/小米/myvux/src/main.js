// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import Vuex from 'vuex';
//图片滚动加载
// import infiniteScroll from  'vue-infinite-scroll'
import axios from 'axios';
import FastClick from 'fastclick'
import { AjaxPlugin } from 'vux';

//全局导入样式
import './assets/font-awesome/css/font-awesome.min.css'

FastClick.attach(document.body);
// Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(AjaxPlugin);

//创建状态
const store = new Vuex.Store({
  state:{
    isLogin:""
  },
  mutations:{
  //  更新用户信息
    updateMasterInfoo(state,isLogin){
      state.isLogin = true;
    },
    updateMasterInfon(state,isLogin){
      state.isLogin = false;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el:'#app',
  router,
  store,
  mounted(){
    this.ckeckLogin();
  },
  methods:{
    ckeckLogin:function () {
      axios.get("/master/denglu").then((res)=>{
        // console.log('1111');
        // console.log(res);
        if( res.data.error == 0){
          // this.isLogin = true;
          this.$store.commit("updateMasterInfoo",res.data.master);
        }else{
          // this.isLogin = false;
          this.$store.commit("updateMasterInfon",res.message);
        }

      }).catch( (err)=>{
        console.log(err);
      })
    },
  },
  render: h => h(App)
}).$mount('#app')

// 可以通过el属性，将vue实例挂载在原DOM上
// 也可以通过new Vue().$mount('#app')，手动将实例挂载在DOM上
