<template>
    <div class="wrapper">
      <div class="mainWrap">
        <!-- 第一部分 -->
        <div class="hd">
          <!-- 当没有用户登录时 -->
          <div class="user" v-if="!isLogin">
            <a href="#/login">
              <div class="img nologin"></div>
              <div class="name">登录/注册</div>
            </a>
          </div>
          <!-- 当有用户登录时 -->
          <div class="user" v-if="isLogin">
            <a href="#/setting">
              <div class="nologin" v-if="master.avatar.length != 0">
                <img :src=" 'http://localhost:3500/userimg/' + master.avatar[0] " alt="">
              </div>
              <div  class="nologin" v-if="master.avatar.length == 0">
                <img src="/static/12.png" alt="">
              </div>
              <div class="name bank">
                <p v-if="master.nickname != ''"><span>{{ master.nickname }}</span></p>
                <p v-if="master.nickname == ''"><span>快来设置昵称吧</span></p>
                <div class="account" v-if="master.motto != ''">{{ master.motto }}</div>
                <div class="account" v-if="master.motto == ''">什么都没有设置哦</div>
              </div>
            </a>
          </div>
        </div>
        <!-- 第二部分 -->
        <!-- 没有用户登录时 -->
        <div class="a1" v-if="!isLogin">
          <a class="bill" href="#/login">
            <cite>我的订单</cite>
            <div class="more">
              全部订单
            </div>
          </a>
          <ul class="nav">
            <li class="dfk">
              <a href="#/login">
                <div class="icon"></div>
                <span>待付款</span>
              </a>
            </li>
            <li class="dah">
              <a href="#/login">
                <div class="icon"></div>
                <span>待收货</span>
              </a>
            </li>
            <li class="thx">
              <a href="#/login">
                <div class="icon"></div>
                <span>退换修</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 用户登录时 -->
        <div class="a1" v-if="isLogin">
          <a class="bill" href="#/allList">
            <cite>我的订单</cite>
            <div class="more">
              全部订单
            </div>
          </a>
          <ul class="nav">
            <li class="dfk">
              <a href="#/myorder">
                <div class="icon"></div>
                <span>待付款</span>
              </a>
            </li>
            <li class="dah">
              <a href="#/waitOrder">
                <div class="icon"></div>
                <span>待收货</span>
              </a>
            </li>
            <li class="thx">
              <a href="#/mysale">
                <div class="icon"></div>
                <span>退换修</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 第三部分 -->
        <div class="items">
          <ul>
            <!-- 当用户为普通用户时 -->
            <li class="i-member"  v-if="!isShang">
              <a href="https://m.mi.com/#/pointsmall"><cite>会员福利</cite></a>
            </li>
            <!-- 管理员登录时 -->
            <li class="i-member" v-if="isShang">
            <a href="#/fabu"><cite>发布商品</cite></a>
            </li>
            <!-- 没有登录 -->
            <li class="i-wallet" v-if="!isLogin">
              <a href="#/login"><cite>我的收藏</cite></a>
            </li>
            <!-- 登录 -->
            <li class="i-wallet" v-if="isLogin">
              <a href="#/collect"><cite>我的收藏</cite></a>
            </li>
          </ul>
          <ul>
            <li class="i-service">
              <a href="#/message"><cite>消息中心</cite><span v-if="count != 0" class="num">{{ count }}</span></a>
            </li>
            <li class="i-mihome">
              <a href="https://m.mi.com/#/mihome/"><cite>小米之家</cite></a>
            </li>
          </ul>
          <ul>
            <li class="i-fcode">
              <a href="https://m.mi.com/#/fcode/index"><cite>F码通道</cite></a>
            </li>
          </ul>
          <ul>
            <li class="i-setting">
              <a href="#/setting"><cite>设置</cite></a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 底部 -->
      <nav-footer></nav-footer>
    </div>
</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import NavFooter from '../components/NavFooter4'
  import '../assets/font-awesome/css/font-awesome.min.css'
    export default{
        data: function () {
            return {
                isLogin:false,
                isShang:'',
                master:'',
                count:0
            }
        },
        components: {
          NavFooter
        },
      computed:{
        ...mapState(['isLogin'])
      },
      mounted(){
        this.ckeckLogin();
      },
      methods:{
        ckeckLogin:function () {
          axios.get("/master/denglu").then((res)=>{
            console.log('1111');
            console.log(res);
            this.master = res.data.master;
            if( res.data.error == 0){
              this.isLogin = true;
              if( res.data.master.name == 'bai123' ){
                  this.isShang = true;
              }else{
                  this.isShang = false;
              }
              var target_id = this.master._id;
              axios.post("/reply/noread",{
                target_id:target_id
              }).then((res)=>{
                  console.log(res.data.data);
                  this.count = res.data.data;
              }).catch((err)=>{
                  console.log(err);
              })
            }else{
              this.isLogin = false;
            }
          }).catch( (err)=>{
            console.log(err);
          })
        }
      }
    }

</script>


<style scoped>
  a{
    text-decoration: none;
  }
  cite{
    font-style: normal;
  }
.mainWrap{
  background: #f5f5f5;
  min-height:100%;
  padding-bottom: 5rem;
}
  .hd{
    background: url(/static/11.png) center 0 #f37d0f;
    background-size: auto 100%;
    padding: 1.6rem 0;
    position: relative;
  }
  .hd .user .img{
    border: solid 3px rgba(255,255,255,.4);
    background: url(/static/12.png) no-repeat;
    background-size: 100% auto;
    margin: 0 0.8rem 0 1.6rem;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    border-radius: 100%;
    box-sizing: border-box;
  }
  .hd .user .nologin{
    width: 4rem;
    height: 4rem;
    margin: 0 0.8rem 0 1.6rem;
  }
  .hd .user .nologin img{
    width: 100%;
    height: 100%;
    border: solid 3px rgba(255,255,255,.4);
    border-radius: 100%;
  }
  .hd .user .bank{
    top: 35px;
  }
  .hd .user .bank .account{
    opacity: .6;
    font-size: 0.9rem;
  }
  .name{
    color: #fff;
    font-size: 1rem;
    position: absolute;
    left: 110px;
    top: 45px;
  }
  /* 我的订单部分 */
  .a1{
    background: #fff;
  }
  .a1 a.bill{
    padding-top: 0.6rem;
    padding-right: 2.5rem;
    height: 3rem;
    border-bottom: solid 1px rgba(0,0,0,.15);
    color: rgba(0,0,0,.54);
    display: block;
  }
  .a1 a.bill cite{
    font-size: 1.2rem;
    padding: 0 0 0 1.7rem;
    color: rgba(0,0,0,.87);
    font-style: normal;
  }
  .a1 a.bill .more{
    font-size: 1rem;
    margin-right: 1rem;
    color: rgba(0,0,0,.54);
    float: right;
    position: relative;
  }
  .a1 a.bill .more:after{
    content: "";
    position: absolute;
    right: -1rem;
    top: 50%;
    width: 0.8rem;
    height: 0.8rem;
    border-left: solid 1px currentColor;
    border-top: solid 1px currentColor;
    transform: translate3d(0,-50%,0) rotateZ(135deg);
  }
  .nav{
    list-style: none;
    margin: 0;
    overflow: hidden;
  }
  .nav li{
    text-align: center;
    font-size: 1rem;
    color: rgba(0,0,0,.87);
    width: 33.33%;
    float: left;
  }
  .nav li a{
    padding: 1rem 0;
    display: block;
    color: #333;
    text-align: center;
    font-size: 1rem;
  }
  .nav li a .icon{
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.5rem;
  }
  .nav li:first-child a .icon{
    background: url(/static/8.png) no-repeat center 0;
    background-size: 100% auto;
  }
  .nav li:nth-child(2) a .icon{
    background: url(/static/9.png) no-repeat center 0;
    background-size: 100% auto;
  }
  .nav li:nth-child(3) a .icon{
    background: url(/static/10.png) no-repeat center 0;
    background-size: 100% auto;
  }
  .nav li a span{
    margin: 0;
    padding: 0;
    color: #333;
    text-align: center;
    font-size: 1rem;
  }

  /* 第三部分 */
  .items{
    margin-top: 0.9rem;
  }
  .items ul{
    background: #fff;
    margin-bottom: .9rem;
  }
  .items ul li{
    position: relative;
    color: rgba(0,0,0,.15);
  }
  .items ul li:nth-child(2){
    border-top: solid 1px rgba(0,0,0,.15);
  }
  .items ul li:nth-child(2):before{
    content: "";
    position: absolute;
    left: 0;
    top: -2px;
    height: 3px;
    background: #fff;
    width: 5rem;
  }
  .items ul li:after{
    content: "";
    position: absolute;
    right: 2.5rem;
    top: 50%;
    width: 0.8rem;
    height: 0.8rem;
    border-top: solid 1px currentColor;
    border-left:solid 1px currentColor;
    transform: translate3d(0,-50%,0) rotateZ(135deg);
  }
  .items ul li > a{
    display: -webkit-box;
    padding-right: 2rem;
    padding-left: 5rem;
    height: 3rem;
    color: currentColor;
    position: relative;
  }
  .items ul li > a cite{
    font-size: 1rem;
    color: rgba(0,0,0,.87);
  }
  /* 图片 */
  li.i-member{
    background: url(/static/1.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  li.i-wallet{
    background: url(/static/3.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  li.i-service{
    background: url(/static/4.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  li.i-mihome{
    background: url(/static/5.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  li.i-fcode{
    background: url(/static/6.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  li.i-setting{
    background: url(/static/7.png) no-repeat 1.5rem center;
    background-size: 2rem auto;
  }
  .num{
    position: absolute;
    top:0;
    right: 4rem;
    background: #ff5722;
    display: inline-block;
    padding: 0rem .4rem;
    border-radius: 50%;
    color: #fff;
  }
</style>
