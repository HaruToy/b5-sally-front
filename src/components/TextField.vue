<template>
  <div>
    <div class="todo-textfield" >
      <div class="todo-textfield__inputfield">
        <div class="todo-textfield__inputfield__input">
          <input
            ref="myname"
            class="todo-textfield__inputfield__input--input"
            aria-label="test"
            type="text"
            placeholder="Input our name"
            :value="$store.state.name"
            @input="IsInput"
            @blur="outFocus"
            @focus="onFocus"
            @keyup.enter="storeName"
          />
          <button
            v-if="$store.state.name"
            class="todo-textfield__inputfield__input--deletebutton"
            type="button"
            @click="deleteName"
          ></button>
        </div>
      </div>

      <button
        v-if="sending && $store.state.name"
        class="todo-textfield__sendbutton--texting"
        type="button"
        @click="storeName"
      ></button>
      <button v-else class="todo-textfield__sendbutton" type="button" @click="storeName"></button>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';

export default {
  name: 'TextField.vue',
  data() {
    return {
      inputText: '',
      sending: '',
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.myname.focus();
    });
  },
  methods: {
    IsInput(event) {
      const updatedText = event.target.value;
      this.$store.state.name = updatedText;
      console.log(this.$store.state.name);
    },
    outFocus() {
      this.sending = null;
    },
    onFocus() {
      this.sending = '1';
    },
    deleteName() {
      this.$store.state.name = null;

      this.$nextTick(() => {
        this.$refs.myname.focus();
      });
    },
    storeName() {
      console.log(`My name is ${this.$store.state.name}`);
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
        border: 0;
        width: 100%;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom: solid 1px #cccccc;
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
