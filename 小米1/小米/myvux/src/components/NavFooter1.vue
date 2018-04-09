<template>
  <div>
    <tabbar>
      <tabbar-item selected link="/">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/classify">
        <i slot="icon" class="fa fa-file-text-o"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/shopcart">
        <i slot="icon" class="fa fa-shopping-cart"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/mine">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>

<style scoped>
.weui-tabbar__label span{
  font-size: 14px;
  line-height: 1.6;
}
.weui-tabbar a .weui-tabbar__icon{
  height: 0px;
}
  .weui-tabbar{
    position: fixed;
    bottom: 0;
  }
</style>
