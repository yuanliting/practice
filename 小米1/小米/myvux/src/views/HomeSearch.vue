<template>
    <div class="wrapper">
        <div class="search-wrap">
          <div class="mod-header">
              <div class="left">
                <a href="#/">
                  <i class="fa fa-home"></i>
                </a>
              </div>
            <div class="middle">
                <div class="searchword">
                  <input type="text" name="hunt" v-model="hunt">
                </div>
            </div>
            <div class="searchabel">
              <a @click="sou($event)">
                <!--<img src="/static/2.png" alt="">-->
                <i class="fa fa-search"></i>
              </a>
            </div>
          </div>
          <div v-if="!isShow">
            <div class="mod-body">
              <div class="title">热门搜索</div>
              <a href="">
                <img src="/static/search_1.jpg" alt="">
              </a>
            </div>
            <div class="mod-footer">
              <ul class="shop" v-for="(list,index) in lists">
                <!---->
                <li :style="{background:list.bgcolor,border: list.bdcolor}"><span>{{list.name}}</span></li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
          <div v-if="isShow">
            <div class="all" v-if="isLength">
              <div class="paixv">
                <select @change="search($event)" name="" id="">
                  <option value=""> -- 请选择 -- </option>
                  <option v-for="(price,index) in prices" :value="price">{{ price }}</option>
                </select>
                <span>排序：</span>
                <span @click="findAll" class="mo">默认</span>
                <span @click="sheng" v-if="isPrice">价格<i class="fa fa-long-arrow-up"></i></span>
                <span @click="jiang" v-if="!isPrice">价格<i class="fa fa-long-arrow-down"></i></span>
              </div>
              <!--<aside>-->
                <!--<p>价格：</p>-->
                <!--<span @click="findAll">所有</span>-->
                <!--<ul v-for="(price,index) in prices">-->
                  <!--<li @click="search(index)">{{ price }}</li>-->
                <!--</ul>-->
              <!--</aside>-->
              <ul class="shop">
                <li v-for="(good,ins) in goods" @click="tiao(ins)">
                  <a :href=" '#/details/' + id ">
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
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="null" v-if="!isLength">没有找到相关产品</div>
          </div>
        </div>
    </div>
</template>


<script>
  import axios from 'axios';
    export default{
        data: function () {
            return {
                lists:[
                    {
                      name:'免费领卷',
                      bgcolor:'rgb(228,245,226)',
                      bdcolor:'solid 1px rgb(151,194,138)'
                    },
                    {
                      name:'小米电饭煲',
                      bgcolor:'rgb(232,246,246)',
                      bdcolor:'solid 1px rgb(140,218,222)'
                    },
                    {
                      name:'红米Note 5A',
                      bgcolor:'rgb(248,242,236)',
                      bdcolor:'solid 1px rgb(250,194,136)'
                    },
                    {
                      name:'小米Max 2',
                      bgcolor:'rgb(249,234,234)',
                      bdcolor:'solid 1px rgb(252,160,167)'
                    }
                ],
              prices:["0.00-1000.00","1000.00-5000.00","5000.00-80000.00","8000.00-15000.00"],
              hunt:'',
              isLength:false,
              isShow:false,
              goods:'',
              id:'',
              isPrice:true,
              goodz:''
            }
        },
        components: {},
        methods:{
            sou:function (ev) {
              ev.preventDefault();
              var that = this;
              if(this.hunt != ''){
                this.isShow = !this.isShow
              }
              axios.post('/goods/search',{
                  hunt:this.hunt
              }).then((res)=>{
//                  console.log(res.data.goods.length);
                  if( res.data.error == 0 ){
                      if( res.data.goods.length == 0 ){
                          this.isLength = false;
                      }else{
                          this.isLength = true;
                          this.goods = res.data.goods;
                          console.log(this.goods);
                      }
                  }else{
                      alert('请重新输入');
                  }
              }).catch( (err)=> {
                console.log(err);
              })
            },
          sheng:function () {
            axios.post("/goods/sheng",{
              hunt:this.hunt,
            }).then( (res)=>{
                console.log(res);
              if( res.data.error == 0 ) {
                if (res.data.goods.length == 0) {
                  this.isLength = false;
                } else {
                  this.isLength = true;
                  this.isPrice = !this.isPrice;
                  this.goods = res.data.goods;
                  console.log(this.goods);
                }
              }
            }).catch( (err)=>{
                console.log(err);
            })
          },
          jiang:function () {
            axios.post("/goods/jiang",{
              hunt:this.hunt
            }).then( (res)=>{
              console.log(res);
              if( res.data.error == 0 ) {
                if (res.data.goods.length == 0) {
                  this.isLength = false;
                } else {
                  this.isLength = true;
                  this.isPrice = !this.isPrice;
                  this.goods = res.data.goods;
                  console.log(this.goods);
                }
              }
            }).catch( (err)=>{
              console.log(err);
            })
          },
          tiao:function (index) {
                this.id = this.goods[index]._id;
                console.log(this._id);
          },
          findAll:function () {
            axios.post("/goods/findall",{
              hunt:this.hunt
            }).then( (res)=>{
              console.log(res);
              if( res.data.error == 0 ) {
                if (res.data.goods.length == 0) {
                  this.isLength = false;
                } else {
                  this.isLength = true;
                  this.goods = res.data.goods;
                  console.log(this.goods);
                }
              }
            }).catch( (err)=>{
              console.log(err);
            })
          },
          search:function (ev) {
            axios.post("/goods/findall",{
              hunt:this.hunt
            }).then( (res)=>{
              if( res.data.error == 0 ) {
                if (res.data.goods.length == 0) {
                  this.isLength = false;
                } else {
                  this.isLength = true;
                  this.goodz = res.data.goods;
                  console.log(this.goodz);
                  var pri = ev.target.value.split('-');
                  var aa = [];
                  this.goodz.forEach(function (data) {
                    if(data.price >= pri[0] && data.price <= pri[1]){
                        aa.push(data);
                    }
                  })
                  this.goods = aa;
                }
              }
            }).catch( (err)=>{
              console.log(err);
            })
          }
      }
    }

</script>


<style scoped>
  .clear{
    clear: both;
  }
  .wrapper{
    height: 1500px;
    background: #fff;
  }
  a{
    text-decoration: none;
    color: #333;
  }
.search-wrap{
  height:100%;
  background: #fff;
  padding-top: .2rem;
}
  .mod-header{
    width: 100%;
    position: fixed;
    top:0;
    z-index: 10;
    background: #f5f5f5;
    border-bottom: solid 1px #eee;
    padding: 0.5rem 0;
    overflow: hidden;
  }
  .mod-header .left,.searchabel{
    float: left;
    margin-left: 1rem;
  }
  .mod-header .left a,.searchabel a{
    display: block;
    color: #333;
    margin-top: 0.1rem;
  }
  .mod-header .left a i,.searchabel a i{
    color: #999;
    font-size: 2rem;
    font-weight: 100;
  }
  .mod-header .middle{
    float: left;
    margin-left: 1rem;
    width: 22rem;
    /*width:100%;*/
  }
  .mod-header .middle .searchword{
    border:solid 1px #ccc;
    padding: 0.2rem 1rem;
    background: #fff;
  }
  .mod-header .middle input{
    width: 100%;
    border:none;
    font-size: 1rem;
    line-height: 2rem;
  }
  .mod-body{
    margin-top: 3rem;
  }
  .mod-body .title{
    line-height: 3rem;
    margin-left: 0.5rem;
  }
  .mod-body a img{
    width: 100%;
  }
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
  }
  .null{
    padding-top: 10rem;
    padding-bottom: 100rem;
    text-align: center;
    /*background: #fafafa;*/
    font-size: 1.5rem;
  }
  .all{
    margin-top: 3rem;
    padding-top: 1rem;
    overflow: hidden;
  }
  .all ul li{
    width: 97%;
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

  /* 价格的排序 */
  .paixv{
    padding: .3rem 1rem;
    margin: 0 1rem;
    text-align: right;
    border-bottom: solid 1px #eeeeee;
  }
  .paixv span{
    margin-left: .5rem;
  }
  .paixv select{
    color: #333;
    float: left;
    font-size: 1rem;
    line-height: 1.2rem;
    height: 1.5rem;
  }
  .paixv select option{

  }
  /* 价格的排序 */
</style>
