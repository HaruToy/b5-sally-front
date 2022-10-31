<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view></router-view>
  </div>


</template>
<script>
import TopBar from '@/components/TopBar.vue';

export default {
  components: {
    TopBar
  },
};
</script>
<style>
#app{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
