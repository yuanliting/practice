<template>
    <div>
       <nav-header></nav-header>
      <nav-footer></nav-footer>
    </div>
</template>


<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from '../components/NavFooter1'
  import '../assets/font-awesome/css/font-awesome.min.css'
    export default{
        data: function () {
            return {}
        },
        components: {
            NavHeader,NavFooter
        }
    }

</script>


<style scoped>

</style>
