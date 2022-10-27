<template>
  <div class="todo-textfield">
    <div class="todo-textfield__inputfield">
      <div class="todo-textfield__inputfield__input">
        <input
          ref="myname"
          v-model="inputText"
          class="todo-textfield__inputfield__input--input"
          aria-label="test"
          type="text"
          placeholder="Input our name"
          @blur="outFocus"
          @focus="onFocus"
          @keyup.enter="storeName"
        />
        <button
          v-if="inputText && isFocused"
          ref="delete"
          class="todo-textfield__inputfield__input--deletebutton"
          type="button"
          @mousedown="deleteName"
        ></button>
      </div>
    </div>

    <button
      v-if="inputText && isFocused"
      class="todo-textfield__sendbutton--texting"
      type="button"
      @mousedown="storeName"
    ></button>
    <button v-else class="todo-textfield__sendbutton" type="button"></button>
  </div>
</template>

<script>
// import Vue from 'vue';

export default {
  name: 'TextField.vue',
  data() {
    return {
      inputText: '',
      isFocused: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.myname.focus();
    });
  },
  methods: {
    deleteName() {
      console.log('asldkfjaslkfj');
      this.inputText = '';
      
      setTimeout(() => this.$refs.myname.focus(), 0);

    },
    storeName() {
      console.log(`My name is ${this.inputText}`);
      if (this.inputText != null) {
        localStorage.setItem('name', JSON.stringify(this.inputText));
        this.$emit('storeName');
      }
    },
    outFocus() {
      this.isFocused = false;
      // const deleteBtn = this.$refs.delete;
      // if (deleteBtn !== undefined) {
      //   deleteBtn.style.display = 'none';
      // }
    },
    onFocus() {
      this.isFocused = true;
      // const deleteBtn = this.$refs.delete;
      // if (deleteBtn !== undefined) {
      //   deleteBtn.style.display = 'block';
      // }
    },
  },
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
      width: 648px;
      height: 32px;
      display: flex;
      position: relative;

      &--input {
        width: 100%;
        border-top-width: 0;
        border-right-width: 0;
        border-bottom: 1px solid #cccccc;
        border-left-width: 0;
      }

      &--input::placeholder {
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
        border-bottom: solid 1px dodgerblue;
      }

      &--deletebutton {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 8px;
        right: 0;
        background: url('~/src/assets/deletebutton.svg');
        background-size: 18px 18px;
        border: none;
        cursor: pointer;
      }
    }
  }

  &__sendbutton {
    position: relative;
    left: 10px;
    width: 24px;
    height: 24px;
    background: url('~/src/assets/textfieldsendbutton.svg');
    border: none 10px;
    cursor: pointer;

    &--texting {
      @extend .todo-textfield__sendbutton !optional;
      background: url('~/src/assets/sendbutton_active.svg');
      cursor: pointer;
    }
  }
}
</style>
