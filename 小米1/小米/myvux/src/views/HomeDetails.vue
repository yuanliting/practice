<template>
    <div>
      <div class="header">
        <div class="left">
          <a href=""><img src="/static/fanhui.png" alt=""></a>
        </div>
        <div class="right">
          <a href=""><img src="/static/share.png" alt=""></a>
        </div>
      </div>
      <div class="shouye">
        <swiper loop :threshold="50" height="370px">
          <swiper-item class="black"  v-for="(item,ins) in datas.photo"><h2 class="title fadeInUp animated"><img :src=" 'http://localhost:3500/images/' + datas.photo[ins]"  alt=""></h2></swiper-item>
        </swiper>
      </div>
      <div class="master" v-if="isShow">
        <button class="left" @click="shopRemove">删除</button>
        <a class="right" :href=" '#/edit/' + datas._id">编辑</a>
      </div>
      <div class="shou" v-if="isLogin">
        <span @click="shou" ><i class="fa fa-star"></i>收藏</span>
        <span @click="zan"><i class="fa fa-heart"></i>点赞({{ datas.be_liked }})</span>
      </div>
      <div class="titleView">
        <div class="name">{{ datas.name }}</div>
        <div class="product_desc">
          <font color="#ff4a00">
            {{ datas.discounts }}
          </font>
           {{ datas.promotion }}
        </div>
        <div class="priceBox bb">
          <div class="price">
            {{ datas.price }}
          </div>
        </div>
      </div>
      <div class="productActive bb">
        <div class="div more">
          <div class="mr4x">促销</div>
          <div class="cicon-info">
            <div class="ui-box">
              <div class="cicon-text">赠品</div>
              <div class="active-desc">限量送小米活塞耳机清新版</div>
            </div>
            <div class="ui-box">
              <div class="cicon-text">赠品</div>
              <div class="active-desc">无限流量米粉卡 含100元话费</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-line"></div>
      <div class="pingjia">
        <a :href=" '#/allreply/' + datas._id">
          <div class="top">用户评价 (<span>{{ length }}</span>)</div>
        </a>
        <a href="" v-if="length != 0">
          <div class="comment">
            <div class="item">
              <div class="user">
                <div class="img">
                  <img v-if="replys.author.avatar[0]" :src=" 'http://localhost:3500/userimg/'  + replys.author.avatar[0]" alt="">
                  <img v-if="!replys.author.avatar[0]" src="/static/12.png" alt="">
                </div>
                <span class="name">{{ replys.author.name }}</span>
                <span class="riqi">{{ replys.create_time }}</span>
              </div>
              <div class="content">
                <p class="textbox">
                {{ replys.content }}
                </p>
              </div>
            </div>
          </div>
        </a>
        <a href=""  v-if="length == 0" style="padding-bottom: 2rem;margin-top: 2rem;display: block">
          暂无评价
        </a>
      </div>
      <footer v-if="isLogin">
        <!-- 返回首页(用户登录时) -->
        <a href="#/">
          <i class="fa fa-home"></i>
          <div class="p">首页</div>
        </a>
        <a href="#/shopcart">
          <i class="fa fa-shopping-cart"></i>
          <div class="p">购物车</div>
        </a>
        <div @click="addCart" class="buyNow">加入购物车</div>
      </footer>
      <footer v-if="!isLogin">
        <!-- 返回首页（用户未登录） -->
        <a href="#/">
          <i class="fa fa-home"></i>
          <div class="p">首页</div>
        </a>
        <a href="#/login">
          <i class="fa fa-shopping-cart"></i>
          <div class="p">购物车</div>
        </a>
        <div class="buyNow">加入购物车</div>
      </footer>
    </div>
</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

    export default{
        data: function () {
            return {
              name,
              datas:'',
              isShow:false,
              isLogin:false,
//              用户id
              _id:'',
//              商品id
              good_id:'',
              replys:'',
              length:0,
              isFocus:false
            }
        },
        components: {
          Swiper,
          SwiperItem,
          GroupTitle,
          XButton,
          Divider
        },
      computed:{
        ...mapState(['isLogin'])
      },
      mounted(){
          this.getGoods();
          this.getUser();
          this.ckeckLogin();
          this.getReply();
      },
      methods:{
        getUser:function () {
            axios.get("/master/denglu").then( (master)=>{
                console.log(master);
                if( master.data.error == 0 ){
                  this._id = master.data.master._id;
                  if( master.data.master.name == 'bai123' ){
                    this.isShow = true;
                  }else{
                    this.isShow = false;
                  }
                }
            }).catch( (err)=>{
                console.log(err);
            })
        },
        getGoods:function () {
          var _id = this.$route.params;
          this.good_id = _id;
          console.log(_id);
          var that = this;
          axios.post("/goods/details",{
             _id:_id.id
          }).then((result)=>{
              if( result.data.error == 0 ){
                  this.datas = result.data.data;
//                  console.log(this.datas);
              }
          }).catch((err)=>{
              console.log(err);
          })
        },
        shopRemove:function () {
          var _id = this.$route.params.id;
//          console.log(_id);
          axios.post("/goods/remove/",{
            _id:_id
          }).then( (result)=>{
//              console.log(result);
            if( result.data.error == 0 ){
              alert('删除成功');
              location.href = '#/';
            }
          }).catch( (err)=>{
              console.log(err);
          })
        },
        ckeckLogin:function () {
          var _id = this.$route.params;
          this.good_id = _id;
          axios.get("/master/denglu").then((res)=>{
//            console.log('1111');
//            console.log(res);
            if( res.data.error == 0){
              this.isLogin = true;
              if( res.data.master.name == 'bai123' ){
                this.isShang = true;
              }
            }else{
              this.isLogin = false;
            }

          }).catch( (err)=>{
            console.log(err);
          })
        },
        addCart:function () {
//            console.log(this._id);
//            console.log(this.good_id);
          axios.post("/master/add",{
              _id:this._id,
              good_id:this.good_id.id
          }).then( (result)=>{
              if(result.data.error == 0){
                  alert(result.data.message);
              }
          }).catch( (err)=>{
              console.log(err);
          })
        },
        getReply:function () {
          var _id = this.$route.params.id;
          axios.post("/reply/revert",{
              _id:_id
          }).then((res)=>{
              console.log('1111111111111');
              this.length = res.data.data.length;
              this.replys = res.data.data[0];
              console.log(this.length)
          }).catch((err)=>{
              console.log(err);
          })
        },
        zan:function () {
          var _id = this.$route.params.id;
          axios.post("/goods/zan",{
            _id:_id
          }).then( (res)=>{
              console.log(res);
              this.datas.be_liked++;
          }).catch( (err)=>{
              console.log(err);
          })
        },
        shou:function () {
          var _id = this.$route.params.id;
          axios.post("/master/shou",{
            _id:_id
          }).then( (res)=>{
            console.log(res.data.data);
            if( res.data.error == 0 ){
              this.isFocus = true;
                alert(res.data.message);
            }else{
              this.isFocus = false;
              console.log(this.isFocus);
              alert(res.data.message);
            }
          }).catch( (err)=>{
            console.log(err);
          })
        }
      }
    }

</script>


<style scoped>
  /*<!-- 管理员功能 -->*/
  .active{
    color: #ff5722;
  }
  .master{
    padding: .5rem 1rem;
  }
  button{
    border: none;
    background: none;
    font-size: 1rem;
  }
  a{
    color: #333;
  }
  a.right{
    float: right;
  }
  /*<!-- 管理员功能 -->*/

img{
  width: 100%;
  height: 100%;
}
.header{
  position: relative;
}
.header .left{
  width: 2rem;
  position: absolute;
  top:20px;
  left: 20px;
  z-index: 10;
}
.header .right{
  width: 2rem;
  position: absolute;
  top:20px;
  right: 20px;
  z-index: 10;
}
.header img{
  width: 100%;
}
  /* 底部部分 */
  footer{
    position: fixed;
    bottom:0;
    left:0;
    right: 0;
    background: #fff;
    padding: 0;
    text-align: center;
    font-size: 0.9rem;
  }
  footer a{
    border-right: solid 1px #f4f4f4;
    display: block;
    width: 25%;
    height: 4rem;
    border-top: solid 1px #f4f4f4;
    padding-top: 0.5rem;
    float: left;
    color: rgba(0,0,0,.72);
  }
  i{
    font-size: 2rem;
  }
  .buyNow{
    height: 4rem;
    line-height: 4rem;
    background: #f95b07;
    color: #fff;
    float: left;
    width: 50%;
    font-size: 1.3rem;
  }
.shou{
  border-top:solid 1px #f4f4f4;
  padding: .3rem 1rem;
  font-size: 1rem;
}
.shou span{
  display: inline-block;
}
  .shou span i{
    font-size: 1.2rem;
  }
  .shou span:nth-child(2){
    float: right;
  }
  .active{
    color: #ff5722;
  }



  /* 详情介绍 */
  .titleView{
    padding: 1.2rem 1.2rem 0;
    text-align: left;
    background: #fff;
  }
  .titleView .name{
    font-size: 1.5rem;
    line-height: 2rem;
    color: rgba(0,0,0,.87);
  }
  .product_desc{
    margin-top: .5rem;
    color: rgba(0,0,0,.54);
    line-height: 1.5rem;
  }
  .priceBox{
    padding: 1rem 0;
  }
  .bb{
    border-bottom: solid 1px #f4f4f4;
  }
  .price{
    position: relative;
    display: inline-block;
    padding-left: 1.2rem;
    font-size: 2rem;
    color: #f56600;
  }
.price:before{
  position: absolute;
  top: 0;
  left: -.1rem;
  content: '￥';
  font-size: 1.5rem;
}
  .productActive{
    background: #fff;
    padding: 1.2rem 1.2rem;
  }
  .div{
    position: relative;
    overflow: hidden;
  }
  .mr4x{
    font-size: 1.1rem;
    color: rgba(0,0,0,.54);
    max-width: 3rem;
    margin-left: 1rem;
    float: left;
  }
  .cicon-info{
    /*margin-top: .16rem;*/
    position: relative;
    padding-right: 10%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: auto;
    float: left;
    width: 85%;
  }
.cicon-info:after{
  content: '\0020';
  display: block;
  width: 1rem;
  height: 1rem;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  position: absolute;
  top: 40%;
  right: 1rem;
  transform: rotate(45deg);
}
  .ui-box{
    margin-bottom: .5rem;
    /*white-space: nowrap;*/
    position: relative;
  }
  .cicon-text{
    width: 2.7rem;
    color: #f56600;
    border: 1px solid #f56600;
    border-radius: 1px;
    padding: .2rem .5rem;
    margin: .3rem .8rem .1rem;
    font-size: 0.7rem;
  }
  .active-desc{
    width: 20rem;
    color: rgba(0,0,0,.87);
    position: absolute;
    top: 0;
    left:5rem;
  }
  .ui-line{
    border-bottom: solid 1px #efeff0;
    padding: .5rem 0;
  }
  .pingjia{
    padding: 0 1rem 5rem 1rem ;
    /*padding-bottom: 5rem;*/
    background: #fff;
  }
  .pingjia .top{
    position: relative;
    padding: 1rem 0;
    border-bottom: solid 1px #f4f4f4;
  }
  .pingjia .top:after{
    content: '\0020';
    display: block;
    width: .7rem;
    height: .7rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    position: absolute;
    top:40%;
    right: 1rem;
    transform: rotate(-45deg);
  }
 .comment .item{
   padding-top: .6rem;
 }
  .comment .item .user{
    display: -webkit-box;
    padding: .8rem 0;
  }
  .comment .item .user .img{
    margin-right: 1rem;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  .comment .item .user img{
      width: 100%;
    height: 100%;
  }
  .comment .item .user span{
    display: inline-block;
    color: rgba(0,0,0,.8);
    margin-top: 1rem;
  }
  .comment .item .user span.name{
    margin-right: 1rem;
  }
  .comment .item .content{

  }
  .comment .item .content .textbox{
    padding: .3rem 0;
    line-height: 2rem;
    font-size: 1.1rem;
    color: rgba(0,0,0,.86);
  }
</style>
