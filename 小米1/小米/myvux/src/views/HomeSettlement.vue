<template>

  <div>
      <div v-if="!isShow">
        <header>
          <div class="mod-header">
            <span><a href="#/shopcart"><i class="fa fa-angle-left"></i></a></span>
            <h2> 用户结算 </h2>
          </div>
        </header>
        <div class="page-order">
          <div class="b1" @click="showAdd" v-if="datas.length != 0">
              <div class="b11">
                <p><span>{{ item.username }}</span><span>{{ item.tel }}</span></p>
              </div>
              <div class="b13">
                <p>{{ item.address }}{{ item.streetname }}</p>
              </div>
          </div>
          <div class="b1" @click="showAdd" v-if="datas.length == 0">
            <h1>添加地址</h1>
          </div>
          <div class="ui-line"></div>
          <div class="b8" v-for="(cart,ins) in carts">
            <div class="b8w">
              <div class="b81">
                <div class="img">
                  <img :src=" 'http://localhost:3500/images/' + cart.photo[0]"  alt="">
                </div>
              </div>
              <div class="b82">
                <div class="name">
                  <p><span>{{ cart.name }}</span></p>
                </div>
              </div>
              <div class="b83">
                <div class="price">
                  <span v-if=" cart.num > 1">x{{cart.num}} =</span>
                  <strong>{{ cart.price * cart.num }}.00</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="ui-line"></div>
          <div class="b5">
            <div class="b52">
              <p>
                <strong>商品价格:</strong>
                <span>{{ total }}.00</span>
              </p>
            </div>
            <div class="b53">
              <p>
                <strong>配送费用：</strong>
                <span>0.00</span>
              </p>
            </div>
          </div>
        </div>

        <footer  class="footer1">
          <div class="info-tips"  v-if="datas.length != 0">
            <p>配送至 {{ item.address }}{{ item.streetname }}</p>
          </div>
          <div class="ui-box">
            <div class="b71 ui-box-flex">
              <span>共{{ shop_num }}件 合计：</span>
              <strong>{{ total }}.00</strong>
            </div>
            <div  class="b72 ui-box-flex">
              <a href="" @click="payment($event)">
                <span>去付款</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
        <!--订单地址选择  -->
    <div class="home" v-if="isShow">
      <div class="mod-shouhuo">
        <header>
          <div class="mod-header">
            <span><a href="#/settlement"><i class="fa fa-angle-left"></i></a></span>
            <h2> 收货地址 </h2>
          </div>
        </header>
        <div class="address-manage">
          <div class="ui-card" v-for="(data,ins) in datas">
            <ul>
              <li class="ui-card-item identity">
                <span>{{ data.username }}</span>
                <span>{{ data.tel }}</span>
              </li>
                <!--@click="addEdit(ins)" -->
              <li class="ui-card-item edit"  @click="choose(ins)">
                <a href="#/settlement"  @click="showAdd">
                  <p>{{ data.address }}</p>
                  <p>{{ data.streetname }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <footer class="footer2" @click="address">
          <span>新建地址</span>
        </footer>
      </div>
    </div>
  </div>


</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import '../assets/font-awesome/css/font-awesome.min.css'
    export default{
        data: function () {
            return {
              master:'',
              datas:[],
              isShow:false,
              item:'',
              carts:'',
              shop_num:0,
              arr:[]
            }
        },
      mounted(){
        this.show();
      },
      computed:{
        ...mapState(['isLogin']),
        total() {
          var that = this;
          that.arr = [];
          this.totals = 0;
          console.log(this.carts);
          for(var i = 0; i < this.carts.length; i++ ){
              var zong = this.carts[i].price * this.carts[i].num;
              that.arr.push(zong);
          }
          for( var i = 0; i < that.arr.length; i++){
//            console.log(this.totals)
            this.totals += that.arr[i];
          }
//          console.log(this.totals)
          return this.totals;
        }
      },
      components: {

      },
      methods:{
        address:function () {
          var that = this;
          console.log('点击了');
          location.href = '#/newaddress'
        },
        show:function (){
          axios.get("/master/denglu").then( (res)=>{
//          console.log(res.data.master.addressList);
            this.master = res.data.master;
            this.carts = this.master.noreadList;
            console.log(this.carts);
            this.datas =  this.master.addressList;
            this.item = this.datas[0];
            if( res.data.error == 0) {
              this.carts.forEach((item) => {
                this.shop_num += item.num;
//                console.log(this.shop_num);
              })
            }
          }).catch( (err)=>{
            console.log(err);
          })
        },
        choose:function (ins) {
          const _id = this.master._id;
          axios.post("/master/choose",{
            _id:_id,
            ins:ins
          }).then( (res)=>{
            this.item = res.data.master.addList[0];
            console.log(this.item);
          }).catch( (err)=>{
            console.log(err);
          })
        },
        showAdd:function () {
          this.isShow = !this.isShow;
        },
        payment:function (ev) {
            ev.preventDefault();
            var _id = this.master._id;
            console.log(_id);
            axios.post("/master/payment",{
                _id:_id
            }).then( (res)=>{
                console.log(res);
                if( res.data.error == 0 ){
//                  console.log('输出来了没')
                    alert('购物车已清空，请在订单中查清');
                    location.href = '#/myorder'
                }else{
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
  .home{
    background: #fff;
    width: 100%;
    height: 1500px;
  }
  a{
    color: #333;
    text-decoration: none;
  }
  p{
    padding: 0;
    margin: 0;
  }
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

  .page-order{
    height: 100%;
    padding-bottom: 6.5rem;
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




  /* 订单地址选择 */
  .footer2{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: block;
    text-align: center;
    height: 4rem;
    line-height: 4rem;
    border: solid 1px #FF5722;
    background: #FF5722;
    color: #fff;
  }
  .footer2 span{
    font-size: 1.2rem;
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
    /*border-bottom: solid 1px #eee;*/
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
  .b51 strong{
    font-weight: 400;
  }
  .footer1{
    background: #fff;
    border-top: solid 1px #e0e0e0;
    position: fixed;
    bottom:0;
    width: 100%;
  }
  .info-tips{
    background: #fbf3c4;
    color: #b57842;
    padding: .6rem 1.3rem;
  }
  .info-tips p{
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-box{
    display: -webkit-box;
  }
  .b71,.b72{
    font-size: 1.2rem;
    color: #ff4d14;
    width: 50%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
  .b72 a{
    display: block;
    background: #ff5722;
    text-align: center;
    color: #fff;
    border: solid 1px #ff5722;
  }


  .ui-line{
    border-top:solid 1px #e0e0e0;
    border-bottom:solid 1px #e0e0e0;
    padding: .5rem;
  }

</style>
