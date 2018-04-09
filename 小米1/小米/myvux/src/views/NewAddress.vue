<template>
    <div>
      <div class="mod-dizhi">
        <header>
          <div class="mod-header">
            <span><a href="#/setting"><i class="fa fa-angle-left"></i></a></span>
            <h2> 新增地址 </h2>
          </div>
        </header>

      <div>
        <ul class="ui-list">
          <li class="ui-list-item">
            <div class="label">收货人：</div>
            <div class="ui-input">
              <input type="text" placeholder="真实姓名" name="username" v-model="username" maxlength="15" required>
            </div>
          </li>
          <li class="ui-list-item">
            <div class="label">手机号码：</div>
            <div class="ui-input">
              <input type="number" placeholder="手机号" name="tel" v-model="tel" required>
            </div>
          </li>
          <li class="ui-list-item">
              <x-address  :value="getName(value)" :title="title2" v-model="value" raw-value :list="addressData"></x-address>
          </li>
          <li class="ui-list-item">
            <div class="label">详细地址：</div>
            <div class="ui-input">
              <input type="text" placeholder="详细地址" name="streetname" v-model="streetname" required>
            </div>
          </li>
        </ul>
      </div>
      <footer @click="keep">
        <span>保存地址</span>
      </footer>

      </div>
    </div>
</template>


<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import { Group, XAddress, ChinaAddressData, XButton,Value2nameFilter as value2name } from 'vux'
  import '../assets/font-awesome/css/font-awesome.min.css'
  export default{
    data: function () {
      return {
          username:'',
          tel:'',
          address:'',
          streetname:'',
          title2: '所在地区',
          value:[],
          address:'',
          addressData: ChinaAddressData,
          master:''
      }
    },
    computed:{
      ...mapState(['isLogin'])
    },
    components: {
      Group,
      XAddress
    },
    mounted(){
      this.ckeckLogin();
    },
    methods:{
      getName (value) {
          this.address = value2name(value, ChinaAddressData);
      },
      ckeckLogin:function () {
        axios.get("/master/denglu").then((res)=>{
          console.log('1111');
          console.log(res.data.master);
          this.master = res.data.master;
        }).catch( (err)=>{
          console.log(err);
        })
      },
        keep:function () {
          var addList = {};
          addList.username = this.username;
          addList.tel = this.tel;
          addList.streetname = this.streetname;
          addList.address = this.address;
          let _id = this.master._id;
          axios.post("/master/addRess",{
              _id:_id,
              addList:addList
          }).then( (res)=>{
              console.log(res);
              if( res.data.error == 0 ){
                  alert(res.data.message);
                  setTimeout(function () {
                    location.href = "#/address"
                  })
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
  /* 新增地址 */
  .ui-list{
    position: relative;
    list-style: none;
    margin: 0;
    padding:0;
  }
  .ui-list .ui-list-item{
    border-bottom: solid 1px #D9D9D9;
    font-size: 1.2rem;
    overflow: hidden;
    background: #fff;
    line-height: 1.5rem;
  }
  .label{
    width: 25%;
    float: left;
    padding: 0.9rem 12px;
  }
  .ui-input{
    border:0;
    width: 75%;
    overflow: hidden;
    font-size: 1.1rem;
    float: right;
  }
  .ui-input input{
    font-size: 1.2rem;
    padding: 1rem 1.2rem;
    width: 100%;
    border: 0;
    text-align: start;
    display: inline-block;
  }
  footer{
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
  footer span{
    font-size: 1.2rem;
  }
</style>
