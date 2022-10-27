<template>
  <div id="welcome">
    <div class="getName" >
      <p class="welcome">Welcome Newbie!<br> MyTodo makes it easy to stay organized and manage your life.</p>
      <p class="title">What is your name?</p>
      <TextField class="text" @storeName="moveTodo"></TextField>
    </div>
  </div>
</template>

<script>

import TextField from '../components/TextField.vue';

export default {
  components: {
    TextField
  },
  methods:{
    moveTodo(){
      this.$router.push({ path: '/todo' })
    }
  }
};
</script>

<style scoped>
.getName{
  display: flex;
  margin-left: 120px;
  flex-direction: column;
  justify-content: space-between;
}
.welcome{
  /* Title */
  /*display:inline;*/
  margin: 0;
  position: relative;
  top:60px;
  height: 84px;
  width:fit-content;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
  /* or 150% */
  color: #2C3E50;
}
.title{
  position: relative;
  top:24px;
  width:fit-content;
  height: 72px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  /* identical to box height, or 150% */
  color: #2C3E50;
}
</style>
