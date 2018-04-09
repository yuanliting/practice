<template>
  <div class="wrapper">
    <!-- 主体部分 -->
    <div class="wrap">
      <div class="layout">
        <div class="wrap-header">
          <img src="/static/mi_login.png" alt="">
          <h4>小米账号注册</h4>
        </div>
        <div class="wrap-main">
          <!-- 输入框 -->
          <div class="main-input">
            <input type="text" name="username" v-model="username" placeholder="小米ID">
            <!--<input type="text" name="email" v-model="email" placeholder="邮箱">-->
            <input type="text" name="phone" v-model="phone" placeholder="手机号码">
            <input type="text" name="password" v-model="password" placeholder="密码">
          </div>
          <!-- 登录按钮 -->
          <div class="btn-login">
            <input @click="register($event)" type="submit" value="注册">
          </div>
          <!-- 其他 -->
          <div class="btn-register">
            <!-- 注册 -->
            <span>
                <a href="">用户密码登录</a>
              </span>
          </div>
          <p class="message"  v-if="message">{{ message }}</p>
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
          phone:'',
          password:'',
          message:''
      }
    },
    components: {

    },
    methods:{
        register(ev){
            ev.preventDefault();
            console.log('点击');
            axios.post("/master/register",{
                name:this.username,
                password:this.password,
                phone:this.phone
            }).then((response)=>{
                console.log(response);
                if( response.data.error == 0 ){
                  this.message = response.data.message;
                  if( response.data.master.name == 'bai123' ){
                    this.message = '商家注册成功';
                  }
                  setTimeout(function () {
                    location.href = '#/login';
                  },2000)
                }else{
                  this.message = response.data;
                }
            }).catch((err)=>{
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
  .main-input input:last-child{
    border-radius:  0 0 16px 16px;
    border-top: none;
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
  .errMsg{
    color: peachpuff;
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
