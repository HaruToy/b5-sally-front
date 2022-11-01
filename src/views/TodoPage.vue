<template>
  <div id="todo">
    <div class="todo__hello">
      <p>
        Good {{ Current }}, {{ getNm }}<br />
        <span class="todo_hello__what2do"
          >You've got
          <span class="todo__hello__what2do--cur">{{ numDid }}/{{ numTodo }}</span>
          task Today!</span
        >
      </p>
      <OutlineTextField @addTask="addTask"></OutlineTextField>
    </div>

    <div
      class="todo__list"
      :style="[numTodo ? { 'justify-content': 'flex-start' } : { 'justify-content': 'center' }]"
    >
      <div v-show="numTodo" class="todo__list__menu">
        <div class="todo__list__menu__left">
          <MyDropdown
            :sel-item="selectedItem"
            :items="dropdownList"
            style="position: relative; z-index: 100"
          ></MyDropdown>
        </div>
        <button class="todo__list__menu__clear">Clear All</button>
      </div>

      <div v-show="numTodo" class="todo__list__tasks">
        <div
          v-for="item in TaskList"
          :key="item.id"
          class="todo__list__tasks__task"
        >
          <CheckBox label="라벨" :is-checked="item.status==='COMPLETED'" @checked="toggleComplete(item)"></CheckBox>
          <div
            :class="[
              item.status === 'COMPLETED'
                ? 'todo__list__tasks__task--did'
                : 'todo__list__tasks__task--todo',
            ]"
            @mousedown="selectItem(item)"
          >
            {{ item.content }}
          </div>
          <div class="todo__list__tasks__task__date">{{ item.created_date.substring(5,10) }}</div>
          <button class="todo__list__tasks__task__delete"></button>
        </div>
      </div>
      <p v-show="!numTodo" class="todo__list--noTask">There is no task.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyDropdown from '@/components/MyDropdown.vue';
import CheckBox from '@/components/CheckBox.vue';
import store from '../store/index';
import OutlineTextField from '../components/OutlineTextField.vue';

export default {
  name: 'TodoPage',
  components: {
    CheckBox,
    MyDropdown,
    OutlineTextField,
  },
  data() {
    return {
      Current: '',
      numDid: 0,
      numTodo: 0,
      selectedItem: 'Oldest',
      dropdownList: ['Oldest', 'Latest'],
      TaskList: [

      ],
    };
  },
  computed: {
    getNm() {
      return store.getters.getName;
    },
  },
  mounted() {
    const curHour = new Date().getHours();
    if (curHour > 7 && curHour <= 12) {
      this.Current = 'morning';
    } else if (curHour > 12 && curHour <= 18) {
      this.Current = 'afternoon';
    } else if (curHour > 18 && curHour <= 22) {
      this.Current = 'evening';
    } else if (curHour > 22 || curHour <= 7) {
      this.Current = 'night';
    }
    this.findAllAPI();
  },
  methods: {
    async findAllAPI(){
      const response=await axios.get('http://localhost:8080/tasks');
        // console.log(response.data);
        this.TaskList=response.data;
        this.numTodo=response.data.length;
        this.numDid=0;
        for(let i=0;i<this.numTodo;i+=1){
          if(this.TaskList[i].status==='REGISTERED'){
            this.numDid+=1;
          }
        }
    },
    async updateAPI(item){
      await axios.post(`http://localhost:8080/tasks/${item.id}`,this.TaskList[item.id-1]);
    },
    addTask() {
      this.findAllAPI();
    },
    selectItem(input) {
      console.log(input);
    },
    toggleComplete(item){
          if(this.TaskList[item.id-1].status==='COMPLETED'){
            this.TaskList[item.id-1].status='REGISTERED';
            this.numDid+=1;
          }else{
            this.TaskList[item.id-1].status='COMPLETED';
            this.numDid-=1;
          }
          const cur = new Date();
          this.TaskList[item.id-1].modified_date=`${cur.toISOString()}`;
      this.updateAPI(this.TaskList[item.id-1]);
    }
  },
};
</script>

<style lang="scss" scoped>
$font-family: 'Roboto';
$font-color: #2c3e50;
.todo {
  margin-left: 60px;
  font-family: $font-family;
  color: $font-color;
  display: flex;
  flex-direction: column;
}

.todo__list {
  display: flex;
  background: #f2f2f2;
  min-height: 400px;
  flex-direction: column;

  &__tasks {
    margin-top: 24px;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__task {
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      background: #ffffff;
      width: 1160px;
      height: 60px;
      border-radius: 4px;


      &--did {
        width: 1000px;
        margin-left: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */

        color: #000000;
        text-decoration-line: line-through;
      }

      &--todo {
        width: 1000px;
        margin-left: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */

        color: #000000;
      }
      &__date {
        justify-content: flex-end;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #000000;

        opacity: 0.6;
      }
      &__delete {
        margin-left: 12px;
        justify-content: flex-end;
        width: 28px;
        height: 28px;
        border: none;
        background: url('~/src/assets/btn_remove_nor.svg');
        &:hover {
          @extend .todo__list__tasks__task__delete;
          background: url('~/src/assets/btn_remove_hov.svg');
        }
      }
    }
  }

  &__menu {
    width: 1280px;
    display: flex;
    margin-top: 24px;
    margin-left: 60px;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;

    &__left {
      justify-content: flex-start;
      gap: 12px;
    }

    &__clear {
      justify-content: flex-end;
      align-items: center;
      border: none;
      cursor: pointer;
      margin-right: 64px;
    }
  }

  &--noTask {
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
  font-size: 24px;
  line-height: 36px;

  &__what2do {
    &--cur {
      display: flex;
      font-weight: 700;
      font-size: 48px;
      line-height: 72px;
      color: $font-color;
    }
  }
}
</style>
