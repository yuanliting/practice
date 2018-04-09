<template>
  <div>
    <header>
      <div class="mod-header">
        <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
        <h2> 售后记录 </h2>
        <span><a href="#/search"><i class="fa fa-search"></i></a></span>
      </div>
    </header>
    <div class="empt">
      <a href="" class="b1">
        <div class="btn-apply">申请售后</div>
      </a>
      <div class="b3">

      </div>
    </div>
    <!-- 底部 -->
    <nav-footer></nav-footer>
  </div>
</template>


<script>
  import axios from 'axios';
  import NavFooter from '../components/NavFooter4'
  export default{
    data: function () {
      return {

      }
    },
    components: {
      NavFooter
    }
  }

</script>


<style scoped>
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

  .empt{
    padding: 1rem;
  }
  .empt .b1{
    display: block;
    color: #333;
    text-decoration: none;
  }
  .btn-apply{
    width: 100%;
    color: rgba(0,0,0,.54);
    font-size: 1.2rem;
    line-height: 3rem;
    text-align: center;
    border: solid 1px rgba(0,0,0,.27);
    background-color: #fff;
  }
  .b3{
    padding-top: 10rem;
    color: #999;
    margin: 3rem 6.7rem 0;
    background: url(/static/aftersale.png) 50% 0 no-repeat;
    background-size: 10rem 10rem;
  }
</style>
