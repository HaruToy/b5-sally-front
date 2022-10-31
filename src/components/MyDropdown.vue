<template>
  <div v-click-outside="close" class="dropdown">
    <span class="dropdown__default" :style="dropdownToggle__default">
      <button class="dropdown__default__selected" @focus="getDropdownList">
        {{ selectedItem }}
      </button>
      <button class="dropdown__default__down" @focus="getDropdownList"></button>
    </span>
    <div class="dropdown__open" :style="dropdownToggle__open">
      <span class="dropdown__open__button">
        <button class="dropdown__open__button__selected" @focus="getDropdownList">
          {{ selectedItem }}
        </button>
        <button class="dropdown__open__button__up" @focus="getDropdownList"></button>
      </span>
      <div
        v-for="item in dropdownList"
        :key="item"
        :class="[item == selectedItem ? 'dropdown__open__selected' : 'dropdown__open__compo']"
        @mousedown="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'MyDropdown',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props:['selItem','Items'],
  data(){
    return{
      active:false,
      selectedItem:'안',
      dropdownList:[
        '안','녕'
      ]
    }
  },
  computed:{
    dropdownToggle__default(){
      if(this.active===true){
        return{
          display: 'none'
        }
      }
        return{
          display: 'block'
        }
    },
    dropdownToggle__open(){
      if(this.active===true){
        return{
          display: 'block'
        }
      }
      return{
        display: 'none'
      }
    }
  },
  mounted() {
    this.selectedItem=this.$props.selItem;
    this.dropdownList=this.$props.Items;
  },
  methods:{
    getDropdownList(){
      if(this.active===true){
        this.active=false;
      }else{
      this.active=true
    }},
    close() {
        this.active = false;
    },
    selectItem(input){
      this.selectedItem=input;
      this.active = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$font-family: 'Roboto';
$font-color: #000000;
$font-size: 16px;
.dropdown {
  display: flex;
  width: 120px;
  flex-direction: row;
  align-items: center;
  &__default {
    width: 120px;
    height: 40px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-color: #ffffff;
    display: flex;
    justify-content: left;
    align-items: center;
    &__selected {
      font-style: normal;
      font-weight: 400;
      font-family: $font-family;
      font-size: $font-size;
      padding: 12px;
      text-align: left;
      width: 100px;
      height: 40px;
      background-color: #ffffff;
      color: black;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
    &__down {

      width: 16px;
      height: 16px;
      border: none;
      background: url('~/src/assets/dropdown_down.svg');
    }
  }
  &__open {
    width: 120px;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    display: none;
    background-color: #ffffff;
    //padding: 12px 16px;
    &__button {
      background-color: #ffffff;
      &__selected {
        background-color: #ffffff;
        font-style: normal;
        font-weight: 400;
        font-family: $font-family;
        font-size: $font-size;
        padding: 12px;
        text-align: left;
        width: 100px;
        height: 40px;

        color: black;
        font-size: 16px;
        border: none;
        cursor: pointer;
      }
      &__up {
        width: 16px;
        height: 16px;
        border: none;
        background: url('~/src/assets/dropdown_up.svg');
      }
    }
    &__selected {
      font-style: normal;
      font-weight: 400;
      font-family: $font-family;
      font-size: $font-size;
      line-height: 18px;
      padding: 12px;
      height: 16px;
      border: black;
      cursor: pointer;
      color: dodgerblue;
    }
    &__compo {
      font-style: normal;
      font-weight: 400;
      font-family: $font-family;
      font-size: $font-size;
      line-height: 18px;
      padding: 12px;
      height: 16px;
      //background-color: #FFFFFF;
      border: black;
      cursor: pointer;
    }
  }
}
//.dropdown:hover .dropdown__open{
//  display: block;
//}
.dropdown__open__compo:hover {
  background: rgba(42, 130, 240, 0.1);
}
.dropdown__open__selected:hover {
  background: rgba(42, 130, 240, 0.1);
}
</style>
