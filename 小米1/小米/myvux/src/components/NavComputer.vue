<template>
  <div>
    <div class="section">
      <swiper  loop auto  :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
      <div class="list_one_type14" v-for="data in arr1">
        <div class="item">
          <a :href="'#/details/' + data._id ">
            <div class="img">
              <img :src=" 'http://localhost:3500/images/' + data.photo[0]"  alt="">
            </div>
            <div class="info bgw">
              <div class="l l1">
                <div class="name">{{ data.name }}</div>
                <div class="price">{{ data.price }} <span>起</span></div>
              </div>
              <div class="l l2">
                <div class="brief">{{ data.intro }}</div>
                <div class="buybtn">立即预约</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="list_two_type13">
        <div class="box p15">
          <div class="item w340 mr15" v-for="data in arr2">
            <a :href="'#/details/' + data._id ">
              <div class="img">
                <img :src=" 'http://localhost:3500/images/' + data.photo[0]"  alt="">
                <div class="tagbottom">
                  <img src="/static/15.png" alt="">
                </div>
              </div>
              <div class="info bgw">
                <div class="name">{{ data.name }}</div>
                <div class="brief">{{ data.intro }}</div>
                <div class="price">
                  {{ data.price }} <span>起</span>
                  <div class="old">￥<s>2499</s></div>
                </div>
                <div class="buybtn mauto">立即购买</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
  const baseList = [{
    url: 'javascript:',
    img: '/static/lunbo1.png'
  }, {
    url: 'javascript:',
    img: '/static/lunbo2.png'
  }, {
    url: 'javascript:',
    img: '/static/lunbo3.png',
    fallbackImg: 'https://static.vux.li/demo/3.jpg'
  }]
  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    fallbackImg: item.fallbackImg,
  }))
  export default{
    data: function () {
      return {
        demo06_list: urlList,
        demo06_index: 0,
        datas:[],
        arr1:[],
        arr2:[],
        category:'电脑'
      }
    },
    mounted(){
      this.loading();
    },
    methods: {
      demo06_onIndexChange (index) {
        this.demo06_index = index
      },
      loading:function () {
        var that = this;
        axios.post("/goods/cate",{
          category:that.category
        }).then( function(result){
          console.log(result);
          if( result.data.error == 0 ){
            that.datas = result.data.data;
            that.arr1 = that.datas.slice(0,1);
            that.arr2 = that.datas.slice(1);
            console.log(that.arr1);
            console.log(that.arr2);
          }
        }).catch( function(err){
          console.log(err);
        })
      }
    },
    components: {
      Swiper, SwiperItem, GroupTitle, XButton, Divider
    }
  }

</script>


<style scoped>
  .section{
    margin-top: -1px;
    /*overflow: hidden;*/
  }
  a{
    text-decoration: none;
    color: #333;
  }
  .section:last-child{
    margin-bottom: 150px;
  }
  /* 大图 */
  .list_one_type14{
    background: rgb(244,226,212);
  }
  .list_one_type14 .item{
    padding: 0.5rem;
    position: relative;
  }
  .list_one_type14 .item a{
    color: #333;
    text-decoration: none;
  }
  .list_one_type14 .item a .img{
    /*position: relative;*/
  }
  .list_one_type14 .item a .img img{
    width: 100%;
    height: 100%;
    display: block;
    vertical-align: top;
  }
  .list_one_type14 .item a .info{
    padding: 1rem 1.5rem;
    width: 100%;
  }
  .bgw{
    background: #fff;
  }
  .l1{
    overflow: hidden;
  }
  .name{
    font-size: 1.2rem;
    color: rgba(0,0,0,.87);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
  }
  .price{
    margin-top: 0.6rem;
    display: inline-block;
    font-size: 1.5rem;
    color: #ff6000;
    position: relative;
    margin-left: 1rem;
    white-space: nowrap;
    float: right;
  }
  .price:before{
    content: "￥";
    position: absolute;
    left: -1rem;
    top: 0.1rem;
    font-size: 1rem;
  }
  .price span{
    display: inline-block;
    margin-left: .2rem;
    font-size: 1rem;
  }
  .list_one_type14 .l2{
    overflow: hidden;
  }
  .list_one_type14 .brief{
    width: 17rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    height: 1.2rem;
    line-height: 1.5rem;
    color: rgba(0,0,0,.54);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
  .list_one_type14 .buybtn{
    width: 7rem;
    background: #ff4a48;
    border-radius: .3rem;
    text-align: center;
    color: #fff;
    font-size: 1rem;
    padding: .5rem 0;
    font-weight: 700;
    float: right;
  }

  /* 小图（一行两个） */
  .list_two_type13{
    background: rgb(244,226,212);
  }
  .list_two_type13 .box{
    overflow: hidden;
    text-align: center;
  }
  .p15{
    padding: 0.5rem;
  }
  .list_two_type13 .w340{
    width: 48.5%;
    float: left;
    margin-top: 10px;
  }
  .list_two_type13 .mr15:nth-child(2n + 1){
    margin-right: .6rem;
  }
  .list_two_type13 a .img{
    position: relative;
    height: 15rem;
  }
  .list_two_type13 a .img img{
    width: 100%;
    height: 100%;
    display: block;
    vertical-align: top;
  }
  .list_two_type13 a .img .tagbottom{
    position: absolute;
    bottom: .9rem;
    right: .5rem;
  }
  .list_two_type13 a .img .tagbottom img{
    width: 3.5rem;
  }
  .list_two_type13 .info{
    padding: 1rem 1.5rem;
  }
  .list_two_type13 .name{
    text-align: center;
    float: none;
  }
  .list_two_type13 .price{
    float: none;
  }
  .list_two_type13 .price .old{
    display: inline-block;
    margin-right: .1rem;
    font-size: 1rem;
    color: rgba(0,0,0,0.54);
  }
  .list_two_type13 .price .old s{
    color: rgba(0,0,0,0.54);
  }
  .list_two_type13 .brief{
    margin-top: .2rem;
    font-size: 1rem;
    height: 1.2rem;
    line-height: 1.5rem;
    color: rgba(0,0,0,.54);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .list_two_type13 .buybtn{
    width: 10rem;
    background: #ff4a48;
    border-radius: .3rem;
    text-align: center;
    color: #fff;
    font-size: 1rem;
    padding: .5rem 0;
    font-weight: 700;
    text-align: center;
  }
</style>
