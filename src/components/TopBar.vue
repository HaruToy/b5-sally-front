<template>
  <div class="todo-topbar">
    <div class="todo-topbar__left">
      <div class="todo-topbar__icon"></div>
      <div class="todo-topbar__title">Sally-ToDo</div>
    </div>
    <div class="todo-topbar__right">
      <div class="todo-topbar__date">{{ curDate }}</div>
      <div class="todo-topbar__date--today"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data(){
    return {
      curDate:''
    }
  },
  mounted(){
      const date=new Date();
    const dayStr = new Date(date.getFullYear(),date.getMonth()+1,date.getDay()-1).toString();
      this.curDate=`${date.getMonth()+1}/${date.getDate()}\n
      ${dayStr.slice(0, 3)}
      `
    }
};

</script>

<style lang="scss" scoped>
$font-family: 'Roboto';
$font-color: #ffffff;

.todo-topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background: #6c77a7;
  padding: 0 20px;
  width: 100%;
  height: 48px;
  &__left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    background: url('~/src/assets/topbarleftbutton.svg');
    cursor: pointer;
  }
  &__icon:hover {
    @extend .todo-topbar__icon;
    opacity: 0.2;
    cursor: default;
  }
  &__title {
    font-family: $font-family;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    color: $font-color;
  }

  &__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  &__date {
    font-family: $font-family;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: $font-color;

    &--today {
      @extend .todo-topbar__date;
      color: #99fee7;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
