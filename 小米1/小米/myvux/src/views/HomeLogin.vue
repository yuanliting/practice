<template>
    <div class="wrapper">
      <!-- 主体部分 -->
      <div class="wrap">
        <div class="layout">
          <div class="wrap-header">
            <img src="/static/mi_login.png" alt="">
            <h4>小米账号登录</h4>
          </div>
          <div class="wrap-main">
            <!-- 输入框 -->
            <div class="main-input">
                <input type="text" name="user" v-model="username" placeholder="手机号码/小米ID">
                <input type="text" name="password" v-model="password" placeholder="密码">
            </div>
            <!-- 登录按钮 -->
            <div class="btn-login">
              <input type="submit" @click="login($event)" value="登录">
            </div>
            <!-- 其他 -->
            <div class="btn-register">
              <!-- 注册 -->
              <span>
                <a href="#/register">注册</a>
              </span>
            </div>
            <p class="message" v-if="message">{{ message }}</p>
          </div>
        </div>
      </div>
      <!-- 底部部分 -->
      <div class="mod-footer">
        <p>小米公司版权所有-京ICP备10046444-
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134">
          <span><img src="/static/mi_police.png" alt=""></span>
          京公网安备11010802020134号
          </a>
          -京ICP证110507号</p>
      </div>
    </div>
</template>


<script>
  import axios from 'axios';
    export default{
        data: function () {
            return {
              username:'',
              password:'',
              message:''
            }
        },
        components: {

        },
      methods:{
        login(ev){
          ev.preventDefault();
          var that = this;
          console.log('登录');
          axios.post("/master/login",{
            name:this.username,
            password:this.password,
          }).then( function(response){
            if( response.data.error == 0 ){
              that.message = response.data.message;
              if( response.data.data.name == 'bai123' ){
                that.message = '商家登录成功';
              }
              setTimeout(function () {
                location.href = '#/';
              },2000)
            }else{
              that.message = response.data;
            }
          }).catch(function (err) {
              console.log(err);
          })
        }
      }
    }

</script>


<style scoped>
  .wrapper{
    min-height:100%;
    height:auto;
  }
  .wrap{
    padding-bottom: 5rem;
  }
  .layout{
    width: 100%;
    margin: 0 auto 30px;
    padding: 0 20px;
  }
  .wrap-header{
    padding: 40px 0 22px;
    text-align: center;
  }
  .wrap-header img{
    width: 49px;
  }
  .wrap-header h4{
    font-size: 1.3rem;
    color: #424242;
    font-weight: normal;
  }
  .main-input{
    /*border-radius: 16px;*/
  }
  .main-input input{
    width: 100%;
    padding: 0.8rem 10px;
    display: block;
    font-size: 1.1rem;
    border:solid 1px #eee;
    background: #fff;
  }
  .main-input input:first-child{
     border-radius: 16px 16px 0 0;
    border-bottom: none;
    margin-bottom: 1px;
   }
  .main-input input:nth-child(2){
    border-radius:  0 0 16px 16px;
  }
  .btn-login{
    padding-top: 24px;
  }
  .btn-login input{
    background-color: #33b4ff;
    width: 100%;
    display: block;
    padding: 0.6rem 0;
    text-align: center;
    margin-bottom: 14px;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: #fff;
  }
  .btn-register span a{
    display: block;
    background: #fff;
    margin-top: 10px;
    border:solid 1px #ddd;
    color: #333;
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 14px;
    text-align: center;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 1rem;
  }
.mod-footer{
  color: #757575;
  line-height: 1.5;
  text-align: center;
  font-size: 1rem;
  margin-top: -1rem;
  height: 1rem;
}
  .mod-footer p{
    padding: 10px;
  }
  .mod-footer p a{
    color: #757575;
  }
  .message{
    font-size: 1.1rem;
    padding: .5rem .3rem;
    border-top:solid 1px wheat;
    border-bottom:solid 1px wheat;
    text-align: center;
    background: lightyellow;
    color: burlywood;
  }
</style>
