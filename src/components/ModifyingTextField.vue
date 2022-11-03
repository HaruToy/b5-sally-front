<template>
  <div>
    <div v-click-outside="storeTask2" class="todo-textfield">
      <div class="todo-textfield__inputfield">
        <div class="todo-textfield__inputfield__input">
          <input
            ref="content1"
            class="todo-textfield__inputfield__input--input"
            aria-label="test"
            type="text"
            :placeholder="placeholder"
            :value="inputText"
            @input="IsInput"
            @blur="outFocus"
            @focus="onFocus"
            @keyup.enter="storeTask"
          />
          <button
            v-if="sending && inputText!==''"
            class="todo-textfield__inputfield__input__sendbutton--texting"
            type="button"
            @mousedown="storeTask"
          ></button>
          <button v-else class="todo-textfield__inputfield__input__sendbutton" type="button" @mousedown="storeTask"></button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
// import axios from 'axios';
// import store from '../store/index'

export default {
  name: 'ModifyingTextField',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props:{
    content:String,
    id:Number
  },
  data() {
    return {
      inputText: this.$props.content,
      sending: '',
      placeholder:'',

    };
  },
  mounted() {
    setTimeout(() => this.$refs.content1.focus(), 0);
  },
  methods: {
    IsInput(event) {
      const updatedText = event.target.value;
      this.inputText = updatedText;
    },
    outFocus() {
      this.storeTask2();
      this.sending = null;
      this.placeholder=''
    },
    onFocus() {
      this.sending = '1';
    },
    storeTask() {
      if(this.inputText!==''){
        this.$emit('modifyTask',this.inputText,this.$props.id)
      }else{

        setTimeout(() => this.$refs.content1.focus(), 0);
      }
      },
    storeTask2() {
      if(this.inputText!==''){
        this.$emit('modifyTask',this.inputText,this.$props.id)
      }else{
        this.placeholder='Enter your Task'
      }
    }
    },
};
</script>

<style lang="scss" scoped>
$font-family: 'Roboto';
$font-color: #ffffff;

.todo-textfield {
  margin-bottom: 8px;

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
      width:88vw;
      height: 60px;
      display: flex;

      &--input {

        border: 0;
        width: 100%;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border: solid 1px #cccccc;
        border-radius: 5px;
      }
      &--input::placeholder {
        margin-left: 10px;
        display: flex;
        font-family: $font-family;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
      &--input:focus {
        border: 0;
        width: 100%;
        outline: none;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border: solid 1px dodgerblue;
        border-radius: 5px;
      }

      &__sendbutton {
        width: 20px;
        height: 20px;
        margin-top: 19px;
        margin-left: -5%;
        background: url('~/src/assets/textfieldsendbutton.svg');
        border: none 10px;

        &--texting {
          @extend .todo-textfield__inputfield__input__sendbutton;
          background: url('~/src/assets/sendbutton_active.svg');
          cursor: pointer;
        }
      }
    }
  }


}
</style>
