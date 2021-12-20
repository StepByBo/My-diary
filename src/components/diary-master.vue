<template>
    <div class="diary_card"> 
        <p class="time" v-show="p_time">{{diary.time}}</p>
        <input v-model="diary.time" @blur="finishEditTime()" class="time_input" v-show="i_time" />

        <p class="select" v-show="p_select">({{privacy_text}})</p>
        <select class="privacy_select" v-show="i_select" @blur="finishEditSelect()" v-model="diary.privacy">
            <option value="0">公开</option>
            <option value="1">仅自己可见</option>
        </select>

        <p class="diary_text" v-show="p_text">{{diary.text}}</p>
        <textarea v-model="diary.text"  @blur="finishEditText()" class="diary_text_input" v-show="i_text"></textarea>

        <button class="edit_button" @click="clickEdit()" v-show="edit">编辑</button>
        <button class="edit_button" @click.stop="clickYes()" v-show="yes">确定</button>
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
        i_text: false,
        p_select: true,
        i_select: false,
        privacy_text:"",
        edit: true,
        yes: false
    }
  },
  created(){
    this.refreshPrivacyText()
  },
  methods:{
      refreshPrivacyText: function(){
        if(this.diary.privacy==0){this.privacy_text="公开"}
        else{this.privacy_text="仅自己可见"}
      },
      finishEditTime: function(){
          this.p_time = true
          this.i_time = false
      },
      finishEditText: function(){
          this.p_text = true
          this.i_text = false
      },
      finishEditSelect: function(){
          this.refreshPrivacyText()
          this.p_select = true
          this.i_select = false
      },
      emitDiaryId: function(id){
          this.$emit('clickDelete',id)
      },
      clickYes: function(){
          this.refreshPrivacyText()
          this.p_time = true
          this.i_time = false
          this.p_text = true
          this.i_text = false
          this.p_select = true
          this.i_select = false
          this.edit=true
          this.yes=false
      },
      clickEdit: function(){
          this.p_time = false
          this.i_time = true
          this.p_text = false
          this.i_text = true
          this.p_select = false
          this.i_select = true
          this.edit=false
          this.yes=true
      }
  }
}
</script>

<style>
.privacy_select{
    font-size: 15px;
    font-family: SimSun;
    position: absolute;
    margin-left: 250px;
    margin-top: 5px;
}
.select{
    font-size: 15px;
    font-family: SimSun;
    position: absolute;
    margin-left: 250px;
    margin-top: 5px;
}
</style>