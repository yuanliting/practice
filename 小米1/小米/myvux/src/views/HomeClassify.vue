<template>
    <div>
      <header>
        <div class="mod-header">
          <span><a href="#/"><i class="fa fa-angle-left"></i></a></span>
          <h2> 商品分类 </h2>
          <span><a href="#/search"><i class="fa fa-search"></i></a></span>
        </div>
      </header>
      <div class="main">
          <div class="list-navbar">
            <ul>
              <li class="active"><span>新品</span></li>
              <li><span>手机</span></li>
              <li><span>电视</span></li>
              <li><span>电脑</span></li>
              <li><span>家电</span></li>
              <li><span>路由</span></li>
              <li><span>智能</span></li>
              <li><span>电源</span></li>
              <li><span>耳机</span></li>
              <li><span>音箱</span></li>
              <li><span>礼品</span></li>
              <li><span>生活</span></li>
              <li><span>米粉卡</span></li>
              <li><span>零售店</span></li>
            </ul>
          </div>
        <div class="list-wrap">
          <!-- 商品的分类  （我还不会做） -->
          <div class="js-list-item category0">
            <div class="f-list">
              <div class="section">
                <a href="">
                  <div class="img">
                    <img src="/static/classfiy_1.png" alt="">
                  </div>
                </a>
              </div>
              <div class="section">
                <div class="category_title">
                  <span>手机</span>
                </div>
              </div>
              <div class="section">
                <div class="category_group">
                  <div class="box">
                    <div class="product">
                      <a href="">
                        <img src="/static/classfiy_2.png" alt="">
                        <span>小米MIX 2</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>


<script>
  import NavFooter from '../components/NavFooter2'
  import '../assets/font-awesome/css/font-awesome.min.css'
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
  /* 主体部分 */
  .main{
    padding-bottom: 5rem;
  }
  .list-navbar{
    position: fixed;
    width: 20%;
    margin-top: 1px;
    top: 65px;
    bottom: 60px;
    border-right: solid 1px #efefef;
    overflow: hidden;
    z-index: 90;
  }
  .list-navbar ul{
    z-index: 90;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -1rem;
    padding: 1rem 1.2rem 1rem 0;
    background: #fefefe;
    overflow-y: auto;
  }
  .list-navbar ul li{
    font-size: 1.2rem;
    height: 3rem;
    line-height: 4rem;
    text-align: center;
  }
  .active span{
    color: #fb7d34;
    font-size: 1.5rem;
  }
  .list-wrap{
    width: 80%;
    margin-left: 6rem;
    padding: 2px 1.5rem;
    background: #fff;
    overflow: hidden;
  }
  .section{
    overflow: hidden;
    transform: translateZ(0);
    margin-top: -1px;
  }
  .img img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .category_title{
    font-size: 1.2rem;
    text-align: center;
    margin-top: 1rem;
    height: 4rem;
    line-height: 4rem;
    /*overflow: hidden;*/
  }
  .category_title span{
    position: relative;
  }
  .category_title span:before{
    content: '';
    position: absolute;
    top:50%;
    left:.2rem;
    width: 2rem;
    border-top: solid 1px #e0e0e0;
    transform: translate3d(-150%,-50%,0);
  }
  .category_title span:after{
    content: '';
    position: absolute;
    top:50%;
    right:-5.5rem;
    width: 2rem;
    border-top: solid 1px #e0e0e0;
    transform: translate3d(-150%,-50%,0);
  }
  .category_group{
    margin: -0.3rem 0 0;
  }
  .box{
    width: 100%;
    /*overflow: hidden;*/
  }
  .product{
    float: left;
    width: 33.33%;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1.2rem;
    width: 5rem;
    height: 5rem;
  }
  a{
    text-decoration: none;
    margin: 0 auto;
  }
  .product img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .product span{
    display: inline-block;
    /*margin-top: 1rem;*/
    white-space: nowrap;
    color: rgba(0,0,0,.54);
    /*overflow: hidden;*/
    text-overflow: ellipsis;
  }
</style>
