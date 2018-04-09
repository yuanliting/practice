<template>
    <div>
      <div>
        <header>
          <div class="mod-header">
            <span><a href=""><i class="fa fa-angle-left"></i></a></span>
            <h2> 商品评论 </h2>
          </div>
        </header>
        <div class="m-reply">
          <div class="m-img">
            <img :src=" 'http://localhost:3500/images/' + good.photo[0] " alt="">
          </div>
          <div class="m-intro">
            <p class="m-name">{{ good.name }}</p>
            <p class="m-intros">
              <font color="#ff4a00">{{ good.discounts }}</font>
              {{ good.promotion }}
            </p>
          </div>
        </div>
        <div class="content">
              <textarea class="editor" name="content" v-model="content" cols="46" rows="8"></textarea>
              <span>
                  <button type="submit" @click="btnClick">评论</button>
              </span>
        </div>
      </div>
    </div>
</template>


<script>
  import axios from 'axios';
    export default{
        data: function () {
            return {
                good:'',
                content:'',
                photo:[],
                files:[],

            }
        },
        components: {

        },
      mounted(){
        this.getGoods();
      },
      methods:{
            getGoods:function () {
              var _id = this.$route.params.id;
              console.log(_id);
              axios.post("/goods/details",{
                  _id:_id
              }).then((res)=>{
                  console.log(res.data.data);
                  this.good = res.data.data
              }).catch((err)=>{
                  console.log(err);
              })
            },
        btnClick:function () {
          const content = this.content;
          var _id = this.$route.params.id;
          console.log(content);
          axios.post("/reply/evaluate",{
              content:content,
              good_id:_id
          }).then( (res)=>{
              console.log(res.data);
              if( res.data.error == 0 ){
                  alert('评价成功');
                  location.href ="#/allList";
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
  li{
    list-style: none;
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

  /*图片信息*/
  .m-reply{
    padding: 1rem;
  }
  .m-img{
    width: 6rem;
    height: 6rem;
    float: left;
    margin-right: 1.5rem;
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
/* 图片信息 */

  /* 评论内容 */
  .content{
    padding: 1rem;
    margin-top: 2rem;
  }
  .content span{
    margin-top: 1rem;
    display: block;
    text-align: right;
  }
  .content span button{
    margin-right: 10px;
    padding: .5rem 1rem;
    background: #ff5722;
    color: #fff;
    border: solid 1px #ff5722;
    border-radius: 5px;
  }
  .content .editor{
    line-height: 2rem;
    font-size: 1.5rem;
  }


  .images {
    width: 90px;
    height: 100px;
    border-radius: 5px;
    /*border: solid 1px black;*/
    margin-left: 10px;
  }
  /* 图片上传 */
</style>
