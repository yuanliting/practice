<template>
  <div>
    <header>
      <div class="mod-header">
        <span><a href="#/setting"><i class="fa fa-angle-left"></i></a></span>
        <h2> 个人设置 </h2>
        <span><a href="#/search"><i class="fa fa-search"></i></a></span>
      </div>
    </header>
    <form action="">
      <ul class="ui-list">
        <li class="ui-list-item">
          <div class="label">用户昵称：</div>
          <div class="ui-input">
            <input type="text" placeholder="请填写昵称" name="nickname" v-model="nickname">
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">个性签名：</div>
          <div class="ui-input">
            <textarea type="text" placeholder="请输入签名" name="motto" v-model="motto"></textarea>
          </div>
        </li>
        <li class="ui-list-item">
          <div class="label">上传头像：</div>
          <div class="ui-input">
            <img v-for="i in files" :src="i" class="images" :key="i" alt="">
            <label for="file-selector" id="file-label">+</label>
            <input id="file-selector" type="file" accept="image/jpeg,image/png,image/gif" @change="chooseImage" multiple>
          </div>
        </li>
      </ul>
      <button type="submit" @click="fabuClick($event)">上传设置</button>
    </form>
  </div>
</template>


<script>
  import  axios from 'axios';
  export default{
    data: function () {
      return {
        master:'',
        nickname:'',
        motto:'',
        photo:[],
        files:[]
      }
    },
    components: {

    },
    mounted(){
      this.checkLogin();
    },
    methods:{
      checkLogin:function () {
        axios.get("/master/denglu").then((res)=>{
          this.master = res.data.master;
        }).catch( (err)=>{
          console.log(err);
        })
      },
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
        data.append('nickname',this.nickname);
        data.append('motto',this.motto);
        console.log('这是data数据')
        console.log(data);
        this.$http.post("/master/publish",data,{
          headers:{
            "content-Type":"multipart/form-data"
          }
        }).then(function (result) {
          if(result.data.error == 0){
            location.href = '#/mine'
          }
//              console.log(result);
        }).catch(function (err) {
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
