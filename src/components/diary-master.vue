<template>
    <div class="diary_card"> 
        <p class="time" v-show="p_time">{{diary.time}}</p>
        <input v-model="diary.time" @blur="finishEditTime()" class="time_input" v-show="i_time" />
        <p class="diary_text" v-show="p_text">{{diary.text}}</p>
        <textarea v-model="diary.text"  @blur="finishEditText()" class="diary_text_input" v-show="i_text"></textarea>
        <button class="edit_button" @click="editTimeAndText()">编辑</button>
        <button class="delete_button" @click="emitDiaryId(diary.id)">删除</button>
    </div>   
</template>

<script>
export default {
  name: 'diaryMaster',
  props:['diary'],
  data(){
    return{
        p_time: true,
        i_time: false,
        p_text: true,
        i_text: false
    }
  },
  methods:{
      finishEditTime: function(){
          this.p_time = true
          this.i_time = false
      },
      finishEditText: function(){
          this.p_text = true
          this.i_text = false
      },
      editTimeAndText: function(){
          this.p_time = false
          this.i_time = true
          this.p_text = false
          this.i_text = true
      },
      emitDiaryId: function(id){
          this.$emit('clickDelete',id)
      }
  }
}
</script>

<style>
</style>