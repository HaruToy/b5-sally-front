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
            @Oldest="reorderTask('ASC')"
            @Latest="reorderTask('DESC')"
          ></MyDropdown>
        </div>
        <button class="todo__list__menu__clear" @mousedown="clearAll">Clear All</button>
      </div>

      <div v-show="numTodo" class="todo__list__tasks">
        <div v-for="item in TaskList" v-show="item.status !== 'DELETED'" :key="item.id">
          <div
            v-if="item.status.substring(item.status.length - 1,item.status.length) !== '0'"
            class="todo__list__tasks__task"
          >
            <CheckBox
              :is-checked="item.status === 'COMPLETED'"
              @checked="toggleComplete(item)"
            ></CheckBox>
            <div
              :class="[
                item.status === 'COMPLETED'
                  ? 'todo__list__tasks__task--did'
                  : 'todo__list__tasks__task--todo',
              ]"
              @mousedown="selectItem(item.id)"
            >
              {{ item.content }}
            </div>
            <div class="todo__list__tasks__task__date">
              {{ item.created_date.substring(5, 10) }}
            </div>
            <button class="todo__list__tasks__task__delete" @mousedown="deleteTask(item)"></button>
          </div>
          <ModifyingTextField
            v-else
            :id="item.id"
            :content="item.content"
            @modifyTask="modifyTask"
          ></ModifyingTextField>
        </div>
      </div>
      <p v-show="!numTodo" class="todo__list--noTask">There is no task.</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import MyDropdown from '@/components/MyDropdown.vue';
import CheckBox from '@/components/CheckBox.vue';
import ModifyingTextField from '@/components/ModifyingTextField.vue';
import store from '../store/index';
import OutlineTextField from '../components/OutlineTextField.vue';
import { findAll,updateTask,enrollTask } from '../api/TaskAPI';

export default {
  name: 'TodoPage',
  components: {
    ModifyingTextField,
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
      TaskList: [],
      id: '',
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
    reorder(){
      if(this.selectedItem==='Oldest'){
        this.reorderTask('ASC')
      }else if(this.selectedItem==='Latest'){

        this.reorderTask('DESC')
      }
    },
    async enrollAPI(task){
      await enrollTask(task).then(()=>{
         this.findAllAPI();
      })
    },
    async findAllAPI() {
      await findAll().then((response) => {
        this.TaskList = response;
        this.numTodo = response.length;
        this.numDid = 0;
        for (let i = 0; i < response.length; i += 1) {
          if (this.TaskList[i].status === 'REGISTERED') {
            this.numDid += 1;
          }
          if (this.TaskList[i].status === 'DELETED') {
            this.numTodo -= 1;
          }
        }
        this.reorder()
      });;

    },
    async updateAPI(item) {
      const cur = new Date();
      this.TaskList[item.id - 1].modified_date = `${cur.toISOString()}`;
    await updateTask(this.TaskList[item.id - 1]).then(()=>{

    })
      },
    modifyTask(content,id) {
      this.TaskList[id - 1].content = content;
      this.TaskList[id-1].status=this.TaskList[id-1].status.substring(0,this.TaskList[id-1].status.length-1)
      this.updateAPI(this.TaskList[id-1]);

    },

    reorderTask(how) {
      let result = {};
      if (how === 'ASC') {
        this.selectedItem='Oldest'
        result = this.TaskList.sort((a, b) => a.id - b.id);
      } else {
        this.selectedItem='Latest'
        result = this.TaskList.sort((a, b) => b.id - a.id);
      }
      this.TaskList = result;
    },
    clearAll() {
      for (let i = 0; i < this.TaskList.length; i += 1) {
        this.TaskList[i].status = 'DELETED';
        this.updateAPI(this.TaskList[i]);
      }
      this.numDid = 0;
      this.numTodo = 0;
    },
    deleteTask(item) {
      if (this.TaskList[item.id - 1].status === 'COMPLETED') {
        this.numDid += 1;
      }
      this.TaskList[item.id - 1].status = 'DELETED';
      this.updateAPI(this.TaskList[item.id - 1]);
      this.numDid -= 1;
      this.numTodo -= 1;
    },

    addTask(content1) {
      const cur = new Date();
      const task = {
        owner: store.getters.getName,
        content: content1,
        status: 'REGISTERED',
        created_date: `${cur.toISOString()}`,
        modified_date: `${cur.toISOString()}`,
      };
      this.enrollAPI(task)
      this.reorder();
    },
    selectItem(i) {
      if(this.TaskList[i - 1].status !=='COMPLETED'){
        this.TaskList[i - 1].status += '0';
      }
    },
    toggleComplete(item) {
      if (
        this.TaskList[item.id - 1].status === 'COMPLETED'
      ) {
        this.TaskList[item.id - 1].status = 'REGISTERED';
        this.numDid += 1;
      } else {
        this.TaskList[item.id - 1].status = 'COMPLETED';
        this.numDid -= 1;
      }

      this.updateAPI(this.TaskList[item.id - 1]);
    },
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
  width: 100%;
  height: 100%;
}

.todo__list {
  display: flex;
  background: #f2f2f2;
  min-height: 400px;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
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
      //justify-content: space-between;
      background: #ffffff;
      width: 88vw;
      height: 60px;
      border-radius: 4px;

      &--did {
        width: 80%;
        margin-left: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */
        cursor: pointer;
        color: #000000;
        text-decoration-line: line-through;
      }

      &--todo {
        width: 80%;
        margin-left: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */
        cursor: pointer;
        color: #000000;
      }
      &__date {
        display: flex;
        width: 35px;
        margin-left: 8%;
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
        display: flex;
        margin-right: 12px;
        margin-left: 1%;
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
    width: 100%;
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
      width: 80px;
      height: 40px;
      justify-content: flex-end;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      align-items: center;
      border: none;
      cursor: pointer;
      margin-right: 12%;
      opacity: 0.6;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
        opacity: 1;
        border-radius: 4px;
      }
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
