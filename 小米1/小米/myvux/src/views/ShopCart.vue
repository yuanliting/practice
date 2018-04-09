<template>
    <div>
      <header>
        <div class="mod-header">
          <span><a href="#/"><i class="fa fa-angle-left"></i></a></span>
          <h2> 购物车 </h2>
          <span><a href="#/search"><i class="fa fa-search"></i></a></span>
        </div>
      </header>
      <div class="cart">
        <!-- 当没有用户登录时 -->
        <div class="nologin"  v-if="!isLogin">
          <a href="#/login">
            <span>登录后享受更多优惠</span>
            <em>去登陆</em>
          </a>
        </div>
        <!-- 购物车为空时 -->
        <div class="noitems" v-if="cart.length == 0">
          <a href="#/">
            <span>购物车还是空的</span>
            <em>去逛逛</em>
          </a>
        </div>
        <!-- 购物车不为空时 -->
        <div class="cart-list">
          <ul>
            <li class="item" v-for="(data,ins) in cart">
              <span class="xuan" @click="btnClick(ins,$event)" title="false">
                <i class="fa fa-circle-o xuan" :id="data._id"></i>
              </span>
              <div class="imgProduct">
                <a href=""><img :src=" 'http://localhost:3500/images/' + data.photo[0]"  alt=""></a>
              </div>
              <div class="info">
                <div class="name">
                  <p>{{ data.name }}</p>
                </div>
                <div class="price">
                  <p>售价： {{ data.price }}元</p>
                </div>
                <div class="num">
                  <div class="number">
                    <div @click="min(ins)" class="input-sub"></div>
                    <div class="input-num">
                      <span>{{ data.num }}</span>
                    </div>
                    <div @click="max(ins)" class="input-add"></div>
                  </div>
                  <div class="delete">
                    <span  @click="remove(ins)" href=""><i class="fa fa-trash"></i></span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="quanxuan" v-if="cart.length != 0">
            <span @click="checkAll($event)"><i class="fa fa-circle-o quan"></i>全选</span>
          </div>
        </div>
      </div>
      <footer v-if="cart.length != 0">
        <div class="price">
          <span>共{{ arr.length }}件  金额：</span><br>
          <strong>{{ money }}</strong>
          <span>元</span>
        </div>
        <div class="btn">
          <a class="ui-button ui-button-a" href=""><span>继续购物</span></a>
        </div>
        <div class="btn">
          <button class="ui-button" @click="jiesuan"><span>去结算</span></button>
        </div>
      </footer>
      <nav-footer  v-if="cart.length == 0"></nav-footer>
    </div>
</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import NavFooter from '../components/NavFooter3'
  import '../assets/font-awesome/css/font-awesome.min.css'
    export default{
        data: function () {
            return {
              isLogin:false,
              cart:'',
              master:'',
              totals:0,
              arr:[],
              arr1:[],
              shop_num:0,
              isShow:false,
              id:'',
              money:0
            }
        },
        components: {
          NavFooter
        },
      computed:{
        ...mapState(['isLogin']),
        total:function () {
          var that = this;
          that.arr1 = [];
          this.totals = 0;
          this.cart.forEach(function (data) {
            var zong = data.price * data.num;
            that.arr1.push(zong);
          })
          for( var i = 0; i < that.arr1.length; i++){
            console.log(this.totals)
            this.totals += that.arr1[i];
          }
          console.log(this.totals)
          return this.totals;
        }
      },
      mounted(){
        this.ckeckLogin();
      },
      methods:{
        ckeckLogin:function () {
          axios.get("/master/denglu").then((res)=>{
            this.cart = res.data.master.cartList;
            this.master = res.data.master;
            if( res.data.error == 0){
              this.isLogin = true;
              this.cart.forEach( (item)=> {
                this.shop_num += item.num;
                console.log(this.shop_num);
              })

            }else{
              this.isLogin = false;
            }

          }).catch( (err)=>{
            console.log(err);
          })
        },
        min:function (index) {
            var item = this.cart[index];
            if(item.num <= 1){
                return
            }
            item.num--;
            this.shop_num = 0;
            this.cart.forEach( (item)=> {
              this.shop_num += item.num;
              console.log(this.shop_num);
            })
            var _id = this.master._id;
            var good_id = item._id;
            axios.post("/master/min",{
                _id:_id,
                good_id:good_id
            }).then( (res)=>{
                console.log(res);
            }).catch( (err)=>{
                console.log(err);
            })
        },
        max:function (index) {
          var item = this.cart[index];
          if(item.num >= 10){
            return
          }
          item.num++;
          this.shop_num = 0;
          this.cart.forEach( (item)=> {
            this.shop_num += item.num;
            console.log(this.shop_num);
          })
          var _id = this.master._id;
          var good_id = item._id;
          axios.post("/master/max",{
            _id:_id,
            good_id:good_id
          }).then( (res)=>{
            console.log(res);
          }).catch( (err)=>{
            console.log(err);
          })
        },
        remove:function (index) {
          var item = this.cart[index];
          this.cart.splice(index,1);
          var _id = this.master._id;
          var good_id = item._id;
          this.shop_num = 0;
          this.cart.forEach( (item)=> {
            this.shop_num += item.num;
            console.log(this.shop_num);
          })
          axios.post("/master/shopRemove",{
              _id:_id,
            good_id:good_id
          }).then( (res)=>{
//              this.master.shop_num = res.data.data.data.shop_num;
          }).catch((err)=>{
              console.log(err);
          })
        },
        btnClick:function (ins,ev) {
          var that = this;
          if( ev.target.title == 'true' ){
            $(ev.target).attr('title',false);
            $(ev.target).removeClass('active');
          }else{
            $(ev.target).attr('title',true);
            $(ev.target).addClass('active');
          }
          if(ev.target.title == 'true'){
              var isCun = false;
              $('i.xuan').each(function () {
                console.log($(this));
                if(!$(this).hasClass('active')){
                    isCun = true;
                }
                console.log(isCun);
              })
//            console.log(isCun);
              if(!isCun){
                    $('.quan').attr('title',true);
                    $('.quan').addClass('active');
              }
              that.money = 0;
              that.master.cartList.forEach(function (cart) {
                if(cart._id == ev.target.id){
                    that.arr.push(cart);

                    that.arr.forEach(function (data) {
                      that.money += data.num * data.price;
                      console.log('111111111111')
                      console.log(that.money);
                    })
                }
              })

          }else{
              if($('i.quan').hasClass('active')){
                  $('i.quan').attr('title',false);
                $('i.quan').removeClass('active');
              }
            that.money = 0;
            that.arr.forEach(function (cart,ins) {
              if(cart._id == ev.target.id){
                that.arr.splice(ins,1);

                that.arr.forEach(function (data) {
                  that.money += data.num * data.price;
                })
              }
            })
          }
        },
        checkAll:function (ev) {
            var that = this;
            if(ev.target.title == 'true'){
                $(ev.target).attr('title',false);
                $(ev.target).removeClass('active');
                $('span.xuan').attr('title',false);
                console.log($('i.xuan'));
                $('i.xuan').removeClass('active');
                that.arr = [];
                that.money = 0;
            }else{
              $(ev.target).attr('title',true);
              $(ev.target).addClass('active');
              $('span.xuan').attr('title',true);
              console.log($('i.xuan'));
              $('i.xuan').addClass('active');
              that.arr = [];
              that.master.cartList.forEach(function (data) {
                that.arr.push(data);
              })
              that.money = that.total;
            }
        },
        jiesuan:function () {
          axios.post("/master/jie",{
              arr:this.arr
          }).then( (res)=>{
              console.log(res);
              if( res.data.error == 0){
                  location.href = "#/settlement";
              }
          }).catch((err)=>{
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


  /* 购物车为空时，未登录时 */
  a{
    text-decoration: none;
  }
  .nologin a{
    border-top: solid 1px #eee;
    display: block;
    height: 4rem;
    padding: 1rem 2rem;
    position: relative;
    color: rgba(0,0,0,.54);
    background: #fff;
  }
  .nologin a:after{
    content: '';
    position: absolute;
    right: 1rem;
    top:50%;
    width: 0.8rem;
    height: 0.8rem;
    border-left: 1px solid currentColor;
    border-top: 1px solid currentColor;
    transform: translate3d(0,-50%,0) rotateZ(135deg);
  }
  .nologin a span{
    font-size: 1.2rem;
    color: rgba(0,0,0,.87);
  }
  .nologin a em{
    font-size: 1rem;
    margin-top: 0.1rem;
    color: rgba(0,0,0,.54);
    font-style: normal;
    float: right;
  }
  .noitems{
    background: #ebebeb;
    height: 6rem;
  }
  .noitems a{
    border-top: solid 1px #eee;
    display: block;
    height: 4rem;
    padding: 1rem 2rem;
    position: relative;
    color: rgba(0,0,0,.54);
    position: relative;
  }
  .noitems a span{
    display: block;
    padding: 1rem 5rem;
    line-height: 2rem;
    color: rgba(0,0,0,.27);
    background: url(/static/shopcart.png) no-repeat 0 center;
    background-size: auto 100%;
  }
  .noitems a em{
    border: 1px solid rgba(0,0,0,.15);
    padding: .3rem .6rem;
    font-style: normal;
    color: rgba(0,0,0,.87);
    position: absolute;
    top: 50%;
    right: 35%;
  }



  /* 购物车有商品时 */
  .cart-list ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .cart-list ul .item{
    background: #fff;
    border-bottom: solid 1px #f6f6f6;
    display: list-item;
    padding: 1rem 0;
    overflow: hidden;
    position: relative;
  }
  .xuan {
    position: absolute;
    top: 50%;
    left: .5rem;
    font-size: 1.5rem;
  }
  i.xuan.active{
    background: #ff5722;
    color: #ff5722;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
  }
  /*i.quan{*/
    /*font-size: 1.5rem;*/
  /*}*/
  .quanxuan{
    position: fixed;
    bottom: 3rem;
    padding: .3rem 1rem;
    background: #fff;
    width:100%;
    font-size: 1.5rem;
    border-top:solid 1px #eeeeee;
  }
  .quanxuan i{
    margin-right: .3rem;
  }
  .quanxuan i.active{
    width: 1.3rem;
    height: 1.3rem;
    background: #ff5722;
    color: #ff5722;
    border-radius: 50%;
  }
  .cart-list ul .item:last-child{
    margin-bottom: 4.1rem;
  }
  .imgProduct{
    width: 8rem;
    height: 8rem;
    margin: 0 3rem;
    position: relative;
    float: left;
  }
  .imgProduct a img{
    width: 100%;
  }
  .info{
    float: left;
  }
  .info .name{
    font-size: 1.2rem;
    line-height: 1.5rem;
    color: #666;
    margin-bottom: .5rem;
    margin-right: 1rem;
  }
  .info .price{
    color: #999;
    margin-bottom: .5rem;
  }
  .info .num{
    position: relative;
    width: 15rem;
  }
  .info .num .number{
    display: inline-block;
    border: solid 1px #eee;
  }
  .input-sub,.input-add{
    background: #f4f4f4;
    /*display: inline-block;*/
    width: 2rem;
    height: 2rem;
    position: relative;
    transition: background-color .3s linear 0s;
    float: left;
  }
  .input-sub:after{
    background: #999;
    content: '\0020';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: .2rem;
    border-radius: .2rem;
    margin: -.2rem 0 0 -.5rem;
  }
  .input-add:before{
    background: #999;
    content: '\0020';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: .2rem;
    height: 1rem;
    border-radius: .2rem;
    margin: -.55rem 0 0 -.15rem;
  }
  .input-add:after{
    background: #999;
    content: '\0020';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: .2rem;
    border-radius: .2rem;
    margin: -.2rem 0 0 -.5rem;
  }
  .input-num{
    float: left;
    min-width: 2rem;
    padding: 0 .6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }
  .delete{
    position: absolute;
    right: 0;
    top:-.2rem;
    font-size: 1.5rem;
  }
  .delete span{
    color: #999;
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: solid 1px #f6f6f6;
    background: #fff;
    width: 100%;
    overflow: hidden;
  }
  footer .price{
    width: 33.33%;
    font-size: 1rem;
    color: #999;
    text-align: center;
    float: left;
  }
  footer .price strong{
    font-size: 1.3rem;
    color: #ff5722;
  }
  footer .btn{
    width: 33.33%;
    float: left;
    text-align: center;
  }
  .ui-button{
    display: block;
    text-align: center;
    line-height: 4rem;
    border: solid 1px #ff5722;
    background: #ff5722;
    font-size: 1.3rem;
    color: #fff;
    width: 100%;
  }
  .ui-button span{
    width: 100%;
  }
  .ui-button-a{
    display: block;
    color: #333;
    border: solid 1px #f4f4f4;
    background: #f4f4f4;
  }



</style>
