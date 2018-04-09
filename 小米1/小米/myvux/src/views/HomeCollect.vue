<template>
  <div>
    <div>
      <header>
        <div class="mod-header">
          <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
          <h2> 我的收藏 </h2>
          <span><a href="#/search"><i class="fa fa-search"></i></a></span>
        </div>
      </header>
      <div class="empt"  v-if="reads.length == 0">
        <div class="b3">
          <a class="ui-button ui-button-disable"  href="#/classify"><span>全部商品</span></a>
          <a class="ui-button"  href="https://m.mi.com/#/index/recommend"><span>精选商品</span></a>
        </div>
      </div>
      <div class="page-order"   v-if="reads.length != 0">
        <ul class="shop">
          <li v-for="(read,ins) in reads" @click="tiao(ins)">
            <a :href=" '#/details/' + read._id ">
              <div class="m-img">
                <img :src=" 'http://localhost:3500/images/' + read.photo[0] " alt="">
              </div>
              <div class="m-intro">
                <p class="m-name">{{ read.name }}</p>
                <p class="m-intros">
                  <font color="#ff4a00">{{ read.discounts }}</font>
                  {{ read.promotion }}
                </p>
                <p class="m-price">
                  <span>{{ read.price }}</span>
                </p>
              </div>
            </a>
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
  import NavFooter from '../components/NavFooter4'
    export default{
        data: function () {
            return {
                reads:'',
                master:'',
                id:''
            }
        },
      components: {
        NavFooter
      },
      mounted(){
        this.ckeckLogin();
      },
      methods:{
        ckeckLogin:function () {
          axios.get("/master/denglu").then((res)=>{
            this.master = res.data.master;
            this.reads = this.master.readList;
          }).catch( (err)=>{
            console.log(err);
          })
        },
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

  .ui-line{
    border-top:solid 1px #e0e0e0;
    border-bottom:solid 1px #e0e0e0;
    padding: .5rem;
  }



/* 收藏显示 */
  .shop{
    list-style: none;
    margin-top: 1rem;
  }
  .shop li{
    color: rgb(72,72,72);
    padding: .5rem 1rem;
    margin: .5rem;
    border:solid 1px #f4f4f4;
    float: left;
    width: 97%;
  }

  .m-img{
    width: 25%;
    /*width: 8rem;*/
    /*height: 9rem;*/
    float: left;
    margin-right: 1rem;
  }
  .m-img img{
    width: 100%;
    height: 100%;
  }
  .m-intro{
    /*float: left;*/
    margin-left: 30%;
    width: 70%;
  }
  .m-name{
    font-size: 1.2rem;
    color: rgba(0,0,0,.87);
    margin-bottom: .1rem;
  }
  .m-intros{
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-bottom: .2rem;
    font-size: 0.9rem;
    color: #333;
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
</style>
