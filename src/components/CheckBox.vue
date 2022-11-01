<template>
  <div class="check">
    <input id="ch" aria-label="test" type="checkbox" class="check__box" />
    <span class="check__c" :class="{ on: checked }" @mousedown="toggle"></span>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: ['isChecked'],
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    this.checked=this.$props.isChecked;
  },
  methods: {
    toggle() {
      this.checked = !this.checked;
      this.$emit('checked', this.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.check {
  margin-left: 16px;
  display: flex;
  align-items: center;
  width: 28px;
  height: 28px;
  flex-direction: row;
  justify-content: center;
  &__c {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: cover;
    background: url('~/src/assets/checkboxunchecked.svg');
    cursor: pointer;
    &:hover {
      border:black;
      background: url('~/src/assets/checkbox_unchecked_hov.svg');
    }
  }
  &__c.on {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: cover;
    background: url('~/src/assets/checkboxchecked.svg');
    cursor: pointer;
    &:hover {
      border:black;
      background: url('~/src/assets/checkbox_checked_hov.svg');
    }
  }
  &__box {
    display: none;
  }
}
</style>
