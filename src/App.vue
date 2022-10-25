<template>
  <div id="app">
    <TopBar></TopBar>
    <h1>What is your name?</h1>
    <TextField></TextField>
  </div>
</template>
<script>
import TopBar from './components/TopBar.vue'
import TextField from './components/TextField.vue'

export default {
  components:{
    'TopBar':TopBar,
    'TextField':TextField,
  }
}
</script>
<style lang="scss">

</style>
