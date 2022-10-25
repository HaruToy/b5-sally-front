<template>
  <div id="app">
    <TopBar></TopBar>
    <div class="getName" >
      <p class="welcome">Welcome Newbie!<br> MyTodo makes it easy to stay organized and manage your life.</p>
      <p class="title">What is your name?</p>
      <TextField class="text"></TextField>
    </div>
  </div>
</template>
<script>
import TopBar from './components/TopBar.vue';
import TextField from './components/TextField.vue';

export default {
  components: {
    TopBar,
    TextField,
  },
};
</script>
<style>
.getName{
  margin-left: 120px;
  margin-top: 60px;
  flex-direction: column;
  justify-content: space-between;
}
.welcome{
  /* Title */
  /*display:inline;*/
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
.text{

  width: 424px;
  height: 72px;

}
</style>
