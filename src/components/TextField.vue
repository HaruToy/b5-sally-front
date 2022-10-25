<template>
  <div>
    <form class="todo-textfield" action="">
      <div class="todo-textfield__inputfield">
        <div class="todo-textfield__inputfield__input">
          <input
            ref="myname"
            class="todo-textfield__inputfield__input--input"
            aria-label="test"
            type="text"
            placeholder="Input our name"
            :value="inputText"
            @input="IsInput"
            @blur="outFocus"
            @focus="onFocus"
          />
            <button v-if="inputText" class="todo-textfield__inputfield__input--deletebutton" type="button" @click="deleteName"></button>
        </div>
          <!--<button class="todo-textfield__inputfield--underline"></button>-->
      </div>

      <button v-if="sending&&inputText" class="todo-textfield__sendbutton--texting" type="button"></button>
      <button v-else class="todo-textfield__sendbutton" type="button"></button>
    </form>
  </div>
</template>

<script>
// import Vue from 'vue';

export default {
  name: 'TextField.vue',
  data() {
  return {
    inputText:'',
    sending:''
    };
  },
  methods:{
    IsInput(event){
      const updatedText = event.target.value;
      this.inputText = updatedText;
    },
    outFocus(){
      this.sending=''
    },
    onFocus(){
      this.sending='1'
    },
    deleteName(){
      this.inputText=null;

      this.$nextTick(() => {
        this.$refs.myname.focus()

      })
    }

  }

};
</script>

<style lang="scss" scoped>
$font-family: 'Roboto';
$font-color: #ffffff;

.todo-textfield {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  &__inputfield {
    flex-direction: column;
    align-items: center;
    padding: 0;
    font-size: 0;

    &__input {

      display: flex;
      position: relative;
      &--input {
        position: relative;
        border: 0;
        width: 95%;
        border-left-width:0;
        border-right-width:0;
        border-top-width:0;
        border-bottom: solid 1px #CCCCCC;
      }
      &--input:focus {
        border: 0;
        width: 95%;
        outline: none;
        border-left-width:0;
        border-right-width:0;
        border-top-width:0;
        border-bottom: solid 1px dodgerblue;
      }

      &--deletebutton {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 0;
        background: url('~/src/assets/deletebutton.svg');
        background-size: 18px 18px;
        border:none;
        cursor: pointer;

      }

    }
    &--underline {
      width: 99%;
      background: url('~/src/assets/textfieldunderline.svg');
      border: none;
      &--active {
        background: url('~/src/assets/inputactive.svg');
        width: 99%;
        border: none;
      }
    }

  }


  &__sendbutton {
    width: 24px;
    height: 24px;
    background: url('~/src/assets/textfieldsendbutton.svg');
    border: none 10px;
    cursor: pointer;

    &--texting {
      @extend .todo-textfield__sendbutton !optional;
      background: url('~/src/assets/sendbutton_active.svg');
      color: dodgerblue;
      cursor: default;
    }
  }
}
</style>
