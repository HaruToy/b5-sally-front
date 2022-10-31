<template>
  <div id="todo">
    <div class="todo__hello">
      <p>Good {{ Current }}, {{ getNm }}<br/>
      <span class="todo_hello__what2do">You've got
      <span class="todo__hello__what2do--cur">{{ numDid }}/{{ numTodo }}</span>
      task Today!</span></p>
      <OutlineTextField @addTask="addTask"></OutlineTextField>
    </div>


    <div class="todo__list" :style="[numTodo?{'justify-content':'flex-start'}:{'justify-content':'center'}]">
      <div v-show="numTodo" class="todo__list__menu">
        <div class="todo__list__menu__left">
          <MyDropdown :sel-item="selectedItem" :items="dropdownList"></MyDropdown>
        </div>
          <button class="todo__list__menu__clear">Clear All</button>


      </div>
      <p v-show="!numTodo" class="todo__list--noTask">There is no task.</p>
    </div>
  </div>
</template>

<script>
import MyDropdown from '@/components/MyDropdown.vue';
import store from '../store/index'
import OutlineTextField from '../components/OutlineTextField.vue'

export default {
  name: 'TodoPage',
  components: { MyDropdown, OutlineTextField },
  data() {
    return {
      Current: '',
      numDid: 0,
      numTodo: 0,
      selectedItem:'Oldest',
      dropdownList:[
        'Oldest','Latest'
      ]
    };
  },
  computed:{
    getNm(){
      return store.getters.getName
    },
  },
  created() {

    const curHour = new Date().getHours();
    if (curHour > 7 && curHour <= 12) {
      this.Current = 'morning';
    } else if (curHour > 12 && curHour <= 18) {
      this.Current = 'afternoon';
    } else if (curHour > 18 && curHour <= 22) {
      this.Current = 'evening';
    } else if (curHour > 22 || curHour<=7) {
      this.Current = 'night';
    }
  },
  methods:{
    addTask(){
      this.numDid+=1;
      this.numTodo+=1;
    }
  },
};
</script>

<style lang="scss" scoped>

$font-family: 'Roboto';
$font-color: #2C3E50;
.todo{
  margin-left: 60px;
  font-family: $font-family;
  color:$font-color;
  display: flex;
  flex-direction: column;
}
.todo__list{
  display: flex;
  background: #F2F2F2;
  min-height: 400px;

  &__menu{
    width: 1280px;
    display:flex;
    margin-top:24px;
    margin-left:60px;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;

    &__left{
      justify-content: flex-start;
      gap: 12px;
    }
    &__clear{
      justify-content: flex-end;
      align-items: center;
      border:none;
      cursor:pointer;
      margin-left:64px;
    }
  }
  &--noTask{
    line-height: 400px;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    opacity: 0.6;
  }
}
.todo__hello {
  @extend .todo;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  font-weight: 400;
  font-size:24px;
  line-height: 36px;

  &__what2do {

    &--cur{
      display: flex;
      font-weight: 700;
      font-size:48px;
      line-height: 72px;
      color:$font-color;
    }
 }

}
</style>
