<template>
  <div>
    <header>
      <div class="mod-header">
        <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
        <h2> 全部订单 </h2>
      </div>
    </header>
    <div class="empt" v-if="goods.length == 0">
      <div class="b3">
        <a class="ui-button ui-button-disable"  href="#/classify"><span>全部商品</span></a>
        <a class="ui-button"  href="https://m.mi.com/#/index/recommend"><span>精选商品</span></a>
      </div>
    </div>
    <div class="all" v-if="goods.length != 0">
      <ul>
        <li v-for="(good,ins) in goods">
          <div class="m-img">
            <img :src=" 'http://localhost:3500/images/' + good.photo[0] " alt="">
          </div>
          <div class="m-intro">
            <p class="m-name">{{ good.name }}</p>
            <p class="m-intros">
              <font color="#ff4a00">{{ good.discounts }}</font>
              {{ good.promotion }}
            </p>
            <p class="m-price">
              <span>{{ good.price }}</span>
            </p>
            <p class="m-shou" v-if="!good.has_read"  @click="evaluate(ins)">
              <a :href=" '#/reply/' + good_id "><span>评价</span></a>
            </p>
          </div>
        </li>
      </ul>
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
        goods:[],
        ins:'',
        good_id:''
      }
    },
    components: {
      NavFooter
    },
    mounted(){
      this.checkLogin();
    },
    methods:{
      checkLogin:function () {
        axios.get("/master/denglu").then( (res)=>{
            console.log(res.data)
            this.goods = res.data.master.allList.reverse();
            console.log(this.goods);
        }).catch( (err)=>{
            console.log(err);
        })
      },
      evaluate:function (index) {
        console.log(index);
        console.log(this.goods[index]._id);
        this.good_id = this.goods[index]._id;
      }
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
  .mod-header span:last-child i{
    font-size: 1.7rem;
    float: right;
    padding: 1.3rem;
    color: #999;
  }



  /*当代付款为空时*/
  .b3{
    padding-top: 10rem;
    color: #999;
    margin: 3rem 6.7rem 0;
    background: url(/static/empty.png) 50% 0 no-repeat;
    background-size: 8rem 8rem;
  }
  .b3 .ui-button{
    /*width: 100%;*/
    display: inline-block;
    background: #ff5722;
    border:solid 1px #ff5722;
    line-height: 2rem;
    text-align: center;
    border-radius: .1rem;
    padding: 1rem 2rem;
    margin: 0;
    color: #fff;
  }
  .b3 .ui-button-disable{
    background: #e4e4e4;
    border: solid 1px #f4f4f4;
    color: #333;
  }
  /*当代付款为空时*/

  /*当待付款不为空时*/
  .all{
    margin-bottom: 4rem;
    /*overflow: hidden;*/
  }
  .all ul li{
    width: 97%;
    list-style: none;
    overflow: hidden;
  }
  .m-img{
    width: 8rem;
    height: 9rem;
    float: left;
    margin-right: 1rem;
  }
  .m-img img{
    width: 100%;
    height: 100%;
  }
  .m-intro{
    /*float: left;*/
    position: relative;
  }
  .m-name{
    font-size: 1.3rem;
    color: rgba(0,0,0,.87);
    margin-bottom: .6rem;
  }
  .m-intros{
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-bottom: .6rem;
  }
  .m-price span{
    color: #ff6000;
    font-size: 1.5rem;
    position: relative;
    padding-left: 1rem;
  }
  .m-price span:before{
    content: "￥";
    position: absolute;
    left: -.2rem;
    top: .01rem;
    font-size: 1rem;
    margin-right: .05rem;
    font-weight: 400;
  }
  .m-shou{
    position: absolute;
    right: 0;
    bottom: 0px;
  }
  .m-shou span{
    display: inline-block;
    padding: .5rem 1rem;
    background: #ff5722;
    color: #fff;
    border-radius: 3px;
  }
</style>

