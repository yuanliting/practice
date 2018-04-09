<template>
    <div>
      <div>
        <header>
          <div class="mod-header">
            <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
            <h2> 我的订单 </h2>
            <span><a href="#/search"><i class="fa fa-search"></i></a></span>
          </div>
        </header>
        <div class="empt"  v-if="master.orderList == 0">
          <div class="b3">
            <a class="ui-button ui-button-disable"  href="#/classify"><span>全部商品</span></a>
            <a class="ui-button"  href="https://m.mi.com/#/index/recommend"><span>精选商品</span></a>
          </div>
        </div>
        <div class="page-order"   v-if="master.orderList != 0">
          <div class="or1">
            <div class="or11">
              <p class="or111"><strong>订单日期：</strong><span>2017/11/11 15:15</span></p>
              <p class="or112"><strong>订单编号：</strong><span>12465431862312512</span></p>
            </div>
            <div class="or2">
              <p>等待付款</p>
            </div>
          </div>
          <div class="b8" v-for="(order,ins) in orders">
            <div class="b8w">
              <div class="b81">
                <div class="img">
                  <img :src=" 'http://localhost:3500/images/' + order.photo[0]"  alt="">
                </div>
              </div>
              <div class="b82">
                <div class="name">
                  <p><span>{{ order.name }}</span></p>
                </div>
              </div>
              <div class="b83">
                <div class="price">
                  <span v-if=" order.num > 1">x{{order.num}} =</span>
                  <strong>{{ order.price * order.num }}.00</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="b5">
            <div class="b52">
              <p>
                <span>共{{ shop_num }}件商品</span>
                <span>总金额：</span>
                <strong>{{ total }}元</strong>
              </p>
            </div>
            <div class="b53">
              <a @click="cancel($event)" href="">取消订单</a>
              <a href="#/finish">立即付款</a>
            </div>
          </div>
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
              master:'',
              datas:[],
              orders:'',
              item:'',
              shop_num:0,
              arr:[]
            }
        },
        components: {
          NavFooter
        },
      computed:{
        total() {
          var that = this;
          that.arr = [];
          this.totals = 0;
          for(var i = 0; i < this.orders.length; i++ ){
            var zong = this.orders[i].price * this.orders[i].num;
            that.arr.push(zong);
          }
          for( var i = 0; i < that.arr.length; i++){
            this.totals += that.arr[i];
          }
          return this.totals;
        }
      },
      mounted(){
        this.ckeckLogin();
      },
      methods:{
        ckeckLogin:function () {
          axios.get("/master/denglu").then((res)=>{
            this.master = res.data.master;
            this.orders = this.master.orderList;
            this.datas =  this.master.addressList;
            this.item = this.datas[0];
            if( res.data.error == 0) {
              this.orders.forEach((item) => {
                this.shop_num += item.num;
              })
            }
            console.log(this.orders);
          }).catch( (err)=>{
            console.log(err);
          })
        },
        cancel:function (ev) {
          ev.preventDefault();
          let _id = this.master._id;
          axios.post("/master/cancel",{
              _id:_id
          }).then( (res)=>{
              console.log(res);
              if( res.data.error == 0 ){
                  alert('订单已删除');
                  location.href = '#/mine'
              }
          }).catch( (err)=>{
              console.log(err);
          })
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
  .page-order{
    height: 100%;
    padding-bottom: 3rem;
    position: relative;
  }
  .b1{
    background: #fff;
    padding: 1.2rem 2rem;
    position: relative;
  }
  .b1:after{
    content: " ";
    position: absolute;
    width: .8rem;
    height: .8rem;
    right: 3rem;
    top: 40%;
    margin-top: -.1rem;
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .b11{
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: .6rem;
  }
  .b11 span{
    margin-right: 1rem;
  }
  .b13{
    margin-right: 2rem;
    line-height: 1.1rem;
    color: #757575;
  }


  /* 地址详情 */
  .address-manage{
    font-size: 1.2rem;
  }
  .ui-card{
    margin: 1rem;
    border: solid 1px #f6f6f6;
    overflow: hidden;
    border-radius: .3rem;
    background: #fff;
  }
    ul{
    padding: 0 1rem;
    position: relative;
    list-style: none;
  }
  .identity{
    font-size: 1.2rem;
  }
  .ui-card-item{
    border-bottom: solid 1px #f6f6f6;
    overflow: hidden;
    background: #fff;
    padding: 1rem 0;
    line-height: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-card-item span:first-child{
    margin-right: 2rem;
    color: #f60;
  }
  .edit{
    position: relative;
    padding-right: 2rem;
  }
  .edit:after{
    content: "\0020";
    position: absolute;
    width: .8rem;
    height: .8rem;
    right: 1rem;
    top: 40%;
    margin-top: -.1rem;
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
    transform: rotate(-45deg);
  }
  .edit p{
    font-size: 1rem;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .b8{
    background: #fff;
  }
  .b8w{
    margin: 0 1rem;
    padding: .5rem 0;
    border-bottom: solid 1px #eee;
    line-height: 1.5rem;
    position: relative;
  }
  .b8w .b81{
    margin-right: 1rem;
  }
  .b8w .b81 .img{
    width: 5rem;
    height: 5rem;
  }
  .b8w .b81 .img img{
    width: 100%;
    height: 100%;
  }
  .b8w .b82{
    position: absolute;
    margin-right: 3rem;
    top: 1rem;
    left: 6.3rem;
    width: 15rem;
  }
  .b8w .b82 .name span{
    margin-right: 1rem;
    width: 100%;
  }
  .b8w .b83{
    position: absolute;
    top:2rem;
    right: 1rem;
  }
  .b5{
    background: #fff;
    padding: 1rem 2rem;
  }
  /*.ui-box{*/
    /*display: -webkit-box;*/
  /*}*/

  .or1{
    border-bottom: solid 1px #ececec;
    padding: 2rem 1.1rem 1rem;
    background: #fff;
  }
  .or11 .or111{
    margin-bottom: .2rem;
    font-size: 1.2rem;
  }
  .or11 strong{
    font-weight: 400;
  }
  .or11 .or112{
    color: #999;
  }
  .or2{
    color: #ff5722;
    font-size: 1.3rem;
    position: absolute;
    top:2.3rem;
    right: 2rem;
  }
  .b5{
    text-align: right;
    padding-bottom: 3rem;
  }
  .b52 p span:first-child{
    margin-right: 1rem;
  }
  .b52 p span{
    color: #999;
  }
  .b53 a{
      margin-top: 1rem;
      display: inline-block;
      color: #ff5722;
      border: solid 1px #ff5722;
      font-size: 1.3rem;
      padding: .3rem .8rem;
      border-radius: .3rem;
      margin-left: 1rem;
      text-decoration: none;
  }
  .b53 a:first-child{
    border-color: #999;
    color: #333;
  }
</style>
