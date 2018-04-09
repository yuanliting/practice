<template>
  <div>
    <header>
      <div class="mod-header">
        <span><a href="#/"><i class="fa fa-angle-left"></i></a></span>
        <h2> 商品编辑 </h2>
        <span><a href="#/search"><i class="fa fa-search"></i></a></span>
      </div>
    </header>
    <form action="">
      <ul class="ui-list">
        <!--<li class="ui-list-item">-->
          <!--<div class="label">上传图像：</div>-->
          <!--<div class="ui-input">-->
            <!--<input type="file" name="photo" @change="sctp($event)">-->
          <!--</div>-->
        <!--</li>-->
        <li class="ui-list-item">
          <div class="label">分类：</div>
          <div class="ui-input">
            <select name="category" v-model="datas.category" required>
              <option value="">请选择</option>
              <option value="手机">手机</option>
              <option value="智能">智能</option>
              <option value="电视">电视</option>
              <option value="电脑">电脑</option>
              <option value="生活周边">生活周边</option>
            </select>
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">商品名称：</div>
          <div class="ui-input">
            <input type="text" name="name" v-model="datas.name">
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">价格：</div>
          <div class="ui-input">
            <input type="number" name="price" v-model="datas.price">
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">商品介绍：</div>
          <div class="ui-input">
            <input type="text" name="intro" v-model="datas.intro">
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">优惠活动：</div>
          <div class="ui-input">
            <textarea type="text" name="discounts" v-model="datas.discounts"></textarea>
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">商品简介：</div>
          <div class="ui-input">
            <textarea type="text" name="promotion" v-model="datas.promotion"></textarea>
          </div>
        </li>
      </ul>
      <button type="submit" @click="fabuClick($event)">发布商品</button>
    </form>
  </div>
</template>


<script>
  import  axios from 'axios';
  export default{
    data: function () {
      return {
        category:'',
        datas:''
      }
    },
    mounted(){
      this.getGoods();
    },
    components: {

    },
    methods:{
      getGoods:function () {
        var _id = this.$route.params.id;
        console.log(_id);
        var that = this;
        axios.post("/goods/details",{
           _id:_id
        }).then((result)=>{
          if( result.data.error == 0 ){
            this.datas = result.data.data;
            console.log(this.datas)
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      fabuClick:function (ev) {
          ev.preventDefault();
        axios.post("/goods/edit",{
             good:this.datas
        }).then( (result)=> {
          console.log(result);
          if( result.data.error == 0 ){
            alert('编辑成功');
            location.href = '#/';
          }
        }).catch( (err) =>{
          console.log(err);
        })
      },
      sctp:function (event) {
        this.photo = event.target.files[0].name;
        console.log(this.photo);
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




  form{
    padding: 1rem;
  }
  .ui-list{
    position: relative;
    list-style: none;
    margin: 0;
    padding:0;
  }
  .ui-list .ui-list-item{
    border-bottom: solid 1px #f6f6f6;
    font-size: 1.2rem;
    overflow: hidden;
    background: #fff;
    padding: 1rem 1.2rem;
    line-height: 1.5rem;
  }
  .label{
    width: 25%;
    float: left;
    padding: 0.9rem 0;
  }
  .ui-input{
    border:0;
    width: 75%;
    overflow: hidden;
    font-size: 1.1rem;
    float: right;
  }
  .ui-input input,select,textarea{
    font-size: 1.2rem;
    padding: 1rem 1.2rem;
    width: 100%;
    border: 0;
    text-align: start;
    display: inline-block;
  }
  button{
    margin-top: 2rem;
    padding: .5rem 2rem;
    background: #f95b07;
    border:solid 1px #eee;
    color: #fff;
    font-size: 1.5rem;
  }
</style>
