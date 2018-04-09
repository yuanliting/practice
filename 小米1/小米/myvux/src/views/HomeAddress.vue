<script src="../../../myserver/models/user.js"></script>
<template>
  <div class="home">
   <div class="mod-shouhuo">
     <header>
       <div class="mod-header">
         <span><a href="#/setting"><i class="fa fa-angle-left"></i></a></span>
         <h2> 收货地址 </h2>
         <span><a href="#/search"><i class="fa fa-search"></i></a></span>
       </div>
     </header>
     <div class="address-manage">
       <div class="ui-card" v-for="(data,ins) in datas">
         <ul>
           <li class="ui-card-item identity">
             <span @click="addRemove(ins)">删除</span>
             <span>{{ data.username }}</span>
             <span>{{ data.tel }}</span>
           </li>
           <!--  @click="addEdit(ins)" -->
           <li class="ui-card-item edit">
             <a :href=" '#/addressEdit/' + ins ">
               <p>{{ data.address }}</p>
               <p>{{ data.streetname }}</p>
             </a>
           </li>
         </ul>
       </div>
     </div>
     <footer @click="address">
       <span>新建地址</span>
     </footer>
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
          datas:[]
      }
    },
    computed:{
      ...mapState(['isLogin'])
    },
    components: {

    },
    mounted(){
      this.show();
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
          this.datas =  this.master.addressList;
        }).catch( (err)=>{
          console.log(err);
        })
      },
      addRemove:function (index) {
        console.log(index);
        var item = this.datas[index];
        const _id = this.master._id;
        this.datas.splice(index,1);
        axios.post("/master/addRemove",{
            _id:_id,
            index:index
        }).then( (res)=>{
            console.log(res);
        }).catch( (err)=>{
            console.log(err);
        })
      },
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
  }
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
    float: right;
    color: #999;
  }
  .ui-card-item span:nth-child(2){
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
</style>

