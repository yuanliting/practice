<template>
    <div class="Wrop">
      <div>
        <header>
          <div class="mod-header">
            <span><a href="#/mine"><i class="fa fa-angle-left"></i></a></span>
            <h2> 消息中心 </h2>
          </div>
        </header>
        <div class="xiao" v-if="messages.length != 0">
          <span class="all" @click="readAll">全部已读</span>
          <ul class="messList">
            <li class="mess" v-for="msg in messages">
              <a :href=" '#/details/' + msg.good_id._id ">{{ msg.author_id.name }}</a>评价了您的商品<a :href=" '#/details/' + msg.good_id._id ">{{ msg.good_id.name }}</a>
              <span class="du wei" :id="msg._id" @click="read($event)" v-if="!msg.has_read">未读</span>
              <span class="du yi"  v-if="msg.has_read">已读</span>
            </li>
          </ul>
        </div>
        <div class="xiao" v-if="messages.length == 0">
          <h4>暂时没有消息</h4>
        </div>
      </div>
      <!-- 底部 -->
      <nav-footer></nav-footer>
    </div>
</template>


<script>
  import axios from 'axios';
  import NavFooter from '../components/NavFooter4'
    export default{
        data: function () {
            return {
              master:'',
              messages:''
            }
        },
      components: {
        NavFooter
      },
      mounted(){
        this.checkLogin();
      },
      methods:{
            checkLogin:function () {
              axios.get("/master/denglu").then( (res)=>{
                  console.log(res.data.master._id);
                  this.master = res.data.master;
                axios.post("/reply/message",{
                    target_id:this.master._id
                }).then( (res)=>{
                  console.log(res.data.data);
                  this.messages = res.data.data.reverse();
                }).catch( (err)=>{
                  console.log(err);
                })
              }).catch( (err)=>{
                  console.log(err);
              })
            },
        read:function (ev) {
          var msg_id = ev.target.id;
          axios.post("/reply/update",{
              msg_id:msg_id
          }).then((res)=>{
//              console.log(res);
          }).catch((err)=>{
              console.log(err)
          })
        },
        readAll:function () {
          var target_id = this.master._id;
          axios.post("/reply/updateAll",{
            target_id:target_id
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
  .Wrop{
    height: 1500px;
    background: #fff;
  }
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
    margin-left: calc( 50% - 6rem );
    margin-top: .8rem;
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

  .xiao{
    padding-top: 1rem;
  }
  .xiao h4{
    text-align: center;
    margin-top: 5rem;
  }
  .messList{
    margin-top: .2rem;
    padding:0 1rem;
  }
  .mess{
    padding: 1rem 0;
    background: #fff;
    border-top: solid 1px #e6e6e6;
    position: relative;
  }
  .mess a{
    color: lightcoral;
    margin-left: .6rem;
    margin-right: .6rem;
  }
  .mess:first-child{
    border-top:none;
  }
  .du{
    position: absolute;
    right:1rem;
    display: inline-block;
    padding: .1rem 1rem;
    border-radius: 3px;
  }
  .wei{
    background: lightcoral;
  }
  .yi{
    background: ghostwhite;
  }
  .all{
    margin: 1rem;
    padding: .3rem 1rem;
    background: lightcoral;
    color: #fff;
    border-radius: 3px;
  }
</style>
