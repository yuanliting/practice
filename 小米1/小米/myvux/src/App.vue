<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
      name:'app'
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
*{
  box-sizing: border-box;
}
body {
  background-color: #fbf9fe;
  font-size: 1rem;
  color: #333;
  background: #fafafa;
}
  div{
    display: block;
  }
</style>
