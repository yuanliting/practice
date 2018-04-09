<template>
    <div>
      <div>
        <header>
          <div class="mod-header">
            <span><a href=""><i class="fa fa-angle-left"></i></a></span>
            <h2> 商品评论 </h2>
          </div>
        </header>
        <div class="pingjia">
          <a href="" v-for="reply in replys">
            <div class="comment">
              <div class="item">
                <div class="user">
                  <div class="img">
                    <img v-if="reply.author.avatar[0]" :src=" 'http://localhost:3500/userimg/'  + replys.author.avatar[0]" alt="">
                    <img v-if="!reply.author.avatar[0]" src="/static/12.png" alt="">
                  </div>
                  <span class="name">{{ reply.author.name }}</span><br>
                  <span class="riqi">{{ reply.create_time }}</span>
                </div>
                <div class="content">
                  <p class="textbox">
                    {{ reply.content }}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <!--<footer>-->
          <!--<a :href=" '#/reply/' +  _id">评 价</a>-->
        <!--</footer>-->
      </div>
    </div>
</template>


<script>
  import axios from 'axios';
    export default{
        data: function () {
            return {
              _id:'',
              replys:''
            }
        },
        components: {},
      mounted(){
        this.getGoods();
        this.getReply();
      },
      methods:{
            getGoods:function () {
              this._id = this.$route.params.id;
              console.log(this._id);
              axios.post("/goods/details",{
                _id:this._id
              }).then( (res)=>{
                  console.log(res);
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
            this.replys = res.data.data;
            console.log(this.replys)
          }).catch((err)=>{
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
  .mod-header span:last-child i{
    font-size: 1.7rem;
    float: right;
    padding: 1.3rem;
    color: #999;
  }
  /*评价*/
  .pingjia{
    padding: 0 1rem 1rem ;
    /*padding-bottom: 5rem;*/
    background: #fff;
  }
  .pingjia a .comment{
    border-bottom: solid 1px #eee;
  }
  .pingjia a:last-child .comment{
    border-bottom: none;
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
  /*评价*/

  /*!*底部*!*/
  /*footer{*/
    /*position: fixed;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*text-align: center;*/
  /*}*/
  /*footer a{*/
    /*padding: 1rem 0;*/
    /*font-size: 1.5rem;*/
    /*color: #fff;*/
    /*display: block;*/
    /*background: #ff5722;*/
  /*}*/
</style>
