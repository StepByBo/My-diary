<template>
    <div class="diary_card"> 
        <p class="time" v-show="p_time">{{diary.time}}</p>
        <input v-model="diary.time" class="time_input" v-show="i_time" />

        <p class="p_text" v-show="p_select">({{privacy_text}})</p>
        <select class="privacy_select" v-show="i_select" v-model="diary.privacy">
            <option value="0">公开</option>
            <option value="1">仅自己可见</option>
        </select>

        <p class="c_text" v-show="p_class">({{class_text}})</p>
        <select class="class_select" v-show="i_class" v-model="diary.classId">
            <option v-for="li in class_list" :value="li.id" :key="li.id">{{li.name}}</option>
        </select>

        <p class="diary_text" v-show="p_text">{{diary.context}}</p>
        <textarea v-model="diary.context" class="diary_text_input" v-show="i_text"></textarea>

        <button class="edit_button" @click="clickEdit()" v-show="edit">编辑</button>
        <button class="edit_button" @click.stop="clickYes()" v-show="yes">确定</button>
        <button class="delete_button" @click="emitDiaryId(diary.id)">删除</button>
    </div>   
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'diaryMaster',
  props:['diary'],
  data(){
    return{
        p_time: true,
        i_time: false,
        p_text: true,
        i_text: false,
        p_class: true,
        i_class: false,
        p_select: true,
        i_select: false,
        privacy_text:"",
        class_text:"",
        edit: true,
        yes: false,
        class_list:[]
    }
  },
  created(){
    this.refreshPrivacyText()
    this.refreshClassText()
    axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.class_list = res.data.diaryClass
    })
  },
  updated(){
    this.refreshPrivacyText()
    this.refreshClassText()
    axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.class_list = res.data.diaryClass
    })
  },
  methods:{
      refreshPrivacyText: function(){
        if(this.diary.privacy==0){this.privacy_text="公开"}
        else{this.privacy_text="仅自己可见"}
      },
      refreshClassText: function(){
        axios.get("http://127.0.0.1:3000/diaryClassName",{
            params:{
              id:this.diary.classId
            }
        }).then(res=>{
            this.class_text = res.data.diaryClass.name
        })
      },
      emitDiaryId: function(id){
        this.$emit('clickDelete',id)
      },
      clickYes: function(){
        var data = {
            id: this.diary.id,
            time: this.diary.time,
            context: this.diary.context,
            classId: this.diary.classId,
            privacy: this.diary.privacy
        }
        axios.put("http://127.0.0.1:3000/modifyDiary", qs.stringify(data)
        ).then(res=>{
            this.diary.time = res.data.diary.time
            this.diary.context = res.data.diary.context
            this.diary.classId = res.data.diary.classId
            this.diary.privacy = res.data.diary.privacy
        })

        // this.refreshClassText()
        // this.refreshPrivacyText()
        this.p_time = true
        this.i_time = false
        this.p_text = true
        this.i_text = false
        this.p_select = true
        this.i_select = false
        this.p_class = true
        this.i_class = false
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
        this.p_class = false
        this.i_class = true
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
.p_text{
    font-size: 15px;
    font-family: SimSun;
    position: absolute;
    margin-left: 250px;
    margin-top: 5px;
}
.class_select{
    font-size: 15px;
    font-family: SimSun;
    position: absolute;
    margin-left: 400px;
    margin-top: 5px;
}
.c_text{
    font-size: 15px;
    font-family: SimSun;
    position: absolute;
    margin-left: 400px;
    margin-top: 5px;
}
</style>