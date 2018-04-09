<template>
    <div>
      <div>
        <div class="box box1">
          <p class="p1">
            <span>订单提交完成</span>
          </p>
          <p class="p2" v-if="time1 != 0">
            请在
              <countdown v-model="time1" @on-finish="finish" v-show="show"></countdown>
            秒内完成支付，超时订单将关闭。
          </p>
        </div>
        <div class="box box2">
          <div class="p">
            <span>订单金额：{{ total }}元</span>
            <span>订单编号：1321211213213213</span>
          </div>
          <div class="p h_box" v-for="data in master.addList">
            <div>收货信息：</div>
            <p>{{ data.username }} {{ data.tel }} <br> {{ data.address }} {{ data.streetname }}</p>
          </div>
          <div class="p">
            <p>发票类型：电子发票</p>
            <p>发票抬头：个人</p>
          </div>
        </div>
        <div class="box box3">
          <p @click="jiezhang($event)">去付款</p>
        </div>
      </div>
    </div>
</template>


<script>
  import axios from 'axios';
  import { Cell, Countdown, XSwitch } from 'vux'
    export default{
        data: function () {
            return {
              show: true,
              time1: 60,
              value: '',
              start: false,
              master:'',
              datas:[],
              item:'',
              orders:'',
              shop_num:0,
              arr:[],
              addList:''
            }
        },
        components: {
          Cell,
          Countdown,
          XSwitch
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
        show:{
          axios.get("/master/denglu").then( (res)=>{
            this.master = res.data.master;
            this.orders = this.master.orderList;
            this.datas =  this.master.addressList;
            this.addList = this.master.addList;
            if( res.data.error == 0) {
              console.log(this.orders);
              this.orders.forEach((item) => {
                this.shop_num += item.num;
                console.log(this.shop_num);
              })
            }
          }).catch( (err)=>{
            console.log(err);
          })
        }
      },
      methods:{
        finish (index) {
          this.show = false
          this.value = 'completed'
          console.log('current index', index)
        },
        jiezhang(ev){
          ev.preventDefault();
            alert('购买成功，快去看看新的宝贝吧');
            location.href = '#/';
          let _id = this.master._id;
          axios.post("/master/fukuan/",{
              _id:_id
          }).then((res)=>{
              console.log(res);
          }).catch((err)=>{
              console.log(err);
          })
        }
      }
    }

</script>


<style scoped>
.box1{
  padding:  2rem 1.5rem;
  text-align: center;
}
  .box1 .p1{
    color: #91b953;
    font-size: 1.5rem;
  }
.box1 .p1:before{
  content: '@';
}
.box1 .p2{
  font-size: 1.2rem;
}
  .box2{
    padding:  2rem 1.5rem;
    border: solid 1px #eee;
    color: #666;
    background: #f8f8f8;
  }
  .box2 p{
    font-size: 1rem;
    line-height: 2rem;
  }
  .h_box{
    display: -webkit-box;
  }
  .box3{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .box3 p{
    background-color: #FF5722;
    text-align: center;
    height: 4rem;
    line-height: 4rem;
    border: 1px solid #FF5722;
    font-size: 1.2rem;
    color: #fff;
  }
</style>
