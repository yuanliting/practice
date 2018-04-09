<template>
  <div>
    <header>
      <div class="mod-header">
        <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
        <h2> 个人设置 </h2>
        <span><a href="#/search"><i class="fa fa-search"></i></a></span>
      </div>
    </header>
    <div class="mod-body">
      <div class="b1">
        <ol class="list">
          <li><a href="#/address">地址管理</a></li>
          <li><a href="#/personal">个人设置</a></li>
        </ol>
      </div>
    </div>
    <footer @click="logout">
        <span>退出账号</span>
    </footer>
  </div>
</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import '../assets/font-awesome/css/font-awesome.min.css'
  export default{
    data: function () {
      return {

      }
    },
    computed:{
      ...mapState(['isLogin'])
    },
    components: {

    },
    methods:{
      logout:function () {
        axios.post("/master/logout").then( (res)=>{
          if( res.data.error == 0 ){
            location.href = "#/";
          }else{
            location.reload();
          }
        }).catch( (err)=>{
          console.log(err);
        })
      }
    }
  }

</script>


<style scoped>
  /*<!-- 导购 -->*/
  header{
    height: 4rem;
    color: #999;
    background: #f2f2f2;
    border-bottom: solid 1px #eee;
  }
  .mod-header{
    overflow: hidden;
  }
  .mod-header h2{
    float: left;
    display: inline-block;
    margin-left: calc( 50% - 5rem );
    margin-top: 1.1rem;
    font-weight: 300;
  }
  .mod-header span{
    float: left;
  }
  .mod-header span:first-child i{
    font-size: 3rem;
    padding: 0.6rem 1rem;
    color: #999;
  }
  .mod-header span:last-child{
    float: right;
  }
  .mod-header span:last-child i{
    font-size: 1.7rem;
    float: right;
    padding: 1.3rem;
    color: #999;
  }
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: block;
    text-align: center;
    height: 4rem;
    line-height: 4rem;
    border: solid 1px #f4f4f4;
    background: #f4f4f4;
    color: #333;
  }
  footer span{
    font-size: 1.2rem;
  }
  /* 地址管理 */
  ol{
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    list-style: none;
  }
  ol li{
    width: 100%;
    display: inline-block;
    padding: 1rem;
    border-bottom: solid 1px #e6e6e6;
    position: relative;
  }
  ol li:after{
    content: "\0020";
    position: absolute;
    width: 0.8rem;
    height:0.8rem;
    right: 1.5rem;
    top: 60%;
    margin-top: -1rem;
    border-top: solid 1px #ddd;
    border-right: solid 1px #ddd;
    transform: rotate(45deg);
  }
  ol li a{
    display: block;
    color: #333;
    width: 100%;
  }
</style>

