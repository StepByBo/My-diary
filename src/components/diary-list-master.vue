<template>
    <div class="diary_list_box" v-show="show">
        <div class="diary_card" v-for="diary in diarys" :key="diary.id"> 
            <p class="time" >{{diary.time}}</p>
            <input v-model="diary.time" @blur="finishEditTime($event)" class="time_input" />
            <p class="diary_text" >{{diary.text}}</p>
            <textarea v-model="diary.text"  @blur="finishEditText($event)" class="diary_text_input" ></textarea>
            <button class="edit_button" @click="editTimeAndText($event)">编辑</button>
            <button class="delete_button" @click="deleteThisDiary(diary.id)">删除</button>
        </div>      
    </div>    
</template>

<script>
export default {
  name: 'diaryListMaster',
  props:['show','diarys'],
  methods:{
      finishEditTime: function(event){
        event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:block")
        event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:none")
      },
      finishEditText: function(event){
        event.currentTarget.parentNode.childNodes[2].setAttribute("style","display:block")
        event.currentTarget.parentNode.childNodes[3].setAttribute("style","display:none")
      },
      editTimeAndText: function(event){
        event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:none")
        event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:block")
        event.currentTarget.parentNode.childNodes[2].setAttribute("style","display:none")
        event.currentTarget.parentNode.childNodes[3].setAttribute("style","display:block")
      },
      deleteThisDiary: function(id){
        var message = confirm("确定删除这条日记吗？")
        if(message==true){
          for(var i=0;i<this.diarys.length;i++){
            if(id==this.diarys[i]['id']){
              this.diarys.splice(i,1)
            }
          }
        }
      },
  }
}
</script>

<style>
</style>