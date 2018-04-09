<template>
    <div>
      <header>
        <div class="mod-header">
          <span><a href="#/"><i class="fa fa-angle-left"></i></a></span>
          <h2> 商品上传 </h2>
          <span><a href="#/search"><i class="fa fa-search"></i></a></span>
        </div>
      </header>
      <form action="">
        <ul class="ui-list">
          <li class="ui-list-item">
            <div class="label">分类：</div>
            <div class="ui-input">
              <select name="category" v-model="category" required>
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
              <input type="text" placeholder="请填写商品名称" name="name" v-model="name">
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">价格：</div>
            <div class="ui-input">
              <input type="number" placeholder="价格" name="price" v-model="price">
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">商品介绍：</div>
            <div class="ui-input">
              <input type="text" placeholder="快来介绍一下宝贝吧" name="intro" v-model="intro">
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">优惠活动：</div>
            <div class="ui-input">
              <textarea type="text" placeholder="优惠活动" name="discounts" v-model="discounts"></textarea>
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">商品简介：</div>
            <div class="ui-input">
              <textarea type="text" placeholder="商品简介" name="promotion" v-model="promotion"></textarea>
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">发布人：</div>
            <div class="ui-input">
              <input type="text" :name="master.name" v-model="master.name" disabled>
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">上传图像：</div>
            <div class="ui -input">
              <img v-for="i in files" :src="i" class="images" :key="i" alt="">
              <label for="file-selector" id="file-label">+</label>
              <input id="file-selector" type="file" accept="image/jpeg,image/png,image/gif" @change="chooseImage" multiple>
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
              name:'',
              intro:'',
              discounts:'',
              promotion:'',
              price:'',
              photo:[],
              files:[],
              master:''
            }
        },
        components: {

        },
      mounted(){
            this.checkLogin();
      },
      methods:{
        chooseImage:function (e) {
              var that = this;
              for(var i = 0; i < e.target.files.length; i++){
                  var f = e.target.files[i];
                  this.photo.push(f);
                  var url = URL.createObjectURL(f);
                  this.files.push(url);
              }
            },
        fabuClick:function (ev) {
            ev.preventDefault();
            var data = new FormData();
            for(var i = 0; i < this.photo.length; i++){
                data.append("img",this.photo[i]);
            }
            data.append('url',this.files);
            data.append('name',this.name);
            data.append('intro',this.intro);
            data.append('price',this.price);
            data.append('promotion',this.promotion);
            data.append('discounts',this.discounts);
            data.append('category',this.category);
            data.append('author',this.master._id)
            console.log('这是data数据')
            console.log(data);
            this.$http.post("/goods/publish",data,{
              headers:{
                  "content-Type":"multipart/form-data"
              }
          }).then(function (result) {
            if(result.data.error == 0){
                location.href = '#/'
            }
//              console.log(result);
          }).catch(function (err) {
            console.log(err);
          })
        },
        checkLogin:function () {
          axios.get("/master/denglu").then( (res)=>{
            console.log(res.data.master._id);
            this.master = res.data.master;
          }).catch( (err)=>{
            console.log(err);
          })
        },
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
/* 图片上传 */
  #file-selector {
    display: none;
  }

  #file-label {
    width: 100px;
    height: 100px;
    border: solid 1px black;
    border-radius: 5px;
    display: inline-block;
    font-size: 80px;
    text-align: center;
    line-height: 80px;
    margin-left: 10px;
    vertical-align: top;
  }

  .images {
    width: 90px;
    height: 100px;
    border-radius: 5px;
    /*border: solid 1px black;*/
    margin-left: 10px;
  }
  /* 图片上传 */



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
