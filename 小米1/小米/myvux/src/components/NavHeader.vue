<script src="../../../myserver/models/master.js"></script>
<template>
  <div class="hello">
      <div class="index-header">
        <div class="logo">
          <img src="/static/logo_121d4a6.png" alt="">
        </div>
        <div class="search_bar">
          <a href="#/search">
            <span>搜索商品名称</span>
          </a>
        </div>
        <div class="login">
          <div @click="showClick" v-if="!isLogin">登录</div>
          <!--  @click="logout"  -->
          <div class="pic" v-if="isLogin"><a href="#/mine"><img src="/static/user.png" alt=""></a></div>
        </div>
        <!--<div class="login_in" v-if="isShow">-->
          <!--<a href="#/login">商家登录</a>-->
          <!--<a href="#/login">用户登录</a>-->
        <!--</div>-->
      </div>
      <div class="sub-header">
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                  @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <div>
        <nav-recommend v-if="index === 0"></nav-recommend>
        <nav-phone v-if="index === 1"></nav-phone>
        <nav-capacity v-if="index === 2"></nav-capacity>
        <nav-tv v-if="index === 3"></nav-tv>
        <nav-computer v-if="index === 4"></nav-computer>
        <nav-around v-if="index === 5"></nav-around>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import { Tab, TabItem } from 'vux'
  import NavRecommend from './NavRecommend'
  import NavPhone from './NavPhone'
  import NavCapacity from './NavCapacity'
  import NavTv from './NavTv'
  import NavComputer from './NavComputer'
  import NavAround from './NavAround'
  const list = () => ['推荐', '手机', '智能','电视', '电脑', '生活周边']
  export default {
    name:'hello',
    data () {
      return {
        list2: list(),
        demo2: '推荐',
        index: 0,
        isShow:false,
        isLogin:false
      }
    },
    computed:{
      ...mapState(['isLogin'])
    },
    mounted(){
      this.ckeckLogin();
    },
    methods:{
       showClick:function () {
         location.href = '#/login';
       },
        ckeckLogin:function () {
            axios.get("/master/denglu").then((res)=>{
            console.log('1111');
            console.log(res);
            if( res.data.error == 0){
              this.isLogin = true;
            }else{
              this.isLogin = false;
            }

          }).catch( (err)=>{
            console.log(err);
          })
        }
    },
    components: {
        Tab, TabItem,NavRecommend, NavPhone,NavCapacity,NavTv,NavComputer,NavAround
    }
}
</script>

<style lang="less" scoped>
  div{
    display: block;
  }
  .hello{
    /*position: fixed;*/
    /*top:0;*/
    height: 1.45rem;
    z-index: 3;
  }
  .index-header{
    padding-top: .75rem;
    overflow: hidden;
  }
  .logo{
    width: 4.5rem;
    padding: .4rem 1.25rem;
    float: left;
  }
  .logo img{
    width: 2.3rem;
    height: auto;
  }
  .search_bar{
    line-height: 1.7rem;
    background: url('/static/search_df67e2f.png') no-repeat;
    background-size: 101% 101%;
    width: 20rem;
    height: 2.2rem;
    border-radius: 0.25rem;
    border:solid 1px #e5e5e5;
    float: left;
  }
  .search_bar a{
    display: block;
    padding: .15rem 3rem;
    color: #333;
    text-decoration: none;
    cursor: auto;
  }
  .search_bar a span{
    font-size: 1rem;
    color: rgba(0,0,0,.3);
  }
  .login{
    text-align: center;
    float: left;
    font-size: 1.2rem;
    color: #969696;
    text-align: center;
    margin-left: 1rem;
  }
  .login_in{
    background: #fff;
    position: absolute;
    top: 3rem;
    right: -2rem;
    z-index:100;
  }
  .login_in a{
    display: block;
    color: #969696;
    padding: 1rem 3rem;
  }
  .login_in a:first-child{
    border-bottom: solid 1px #e5e5e5;
  }

  /* 首页的选项卡 */
  .sub-header{
    width: 100%;
  }
  .sub-header .vux-tab{
    background: none;
  }
  .sub-header .vux-tab-item{
    width: 16.66%;
    display: inline-block;
}
.pic{
  width: 1.5rem;
}
  .pic img{
    width: 100%;
  }
</style>
