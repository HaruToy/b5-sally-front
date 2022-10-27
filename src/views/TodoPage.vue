<template>
  <div id="todo">
    <div class="todo__hello">
      <p>Good {{ Current }}, {{ UserName }}<br/>
      <span class="todo_hello__what2do">You've got
      <span class="todo__hello__what2do--cur">{{ numDid }}/{{ numTodo }}</span>
      task Today!</span></p>
      <OutlineTextField @addTask="addTask"></OutlineTextField>
    </div>
  </div>
</template>

<script>
import OutlineTextField from '../components/OutlineTextField.vue'

export default {
  name: 'TodoPage',
  components: { OutlineTextField },
  data() {
    return {
      UserName: '',
      Current: '',
      numDid: 0,
      numTodo: 0,
    };
  },
  created() {
    this.UserName = JSON.parse(localStorage.getItem('name'));
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
    // if(today.getHours())
    // this.HelloMessage=
  },
  methods:{
    addTask(){
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
.todo__hello {
  @extend .todo;
  justify-content: space-between;
  align-items: flex-start;

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
