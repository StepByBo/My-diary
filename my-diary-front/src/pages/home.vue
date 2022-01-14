<template>
    <div id="app">
      <div class="home">
          <div class="head_photo_box">
              <img class="head_photo" src="../assets/img/head.jpg">
          </div>
          <div class="sign">
              <p>{{sign}}</p>
              <router-link :to="{path:'/login'}">
                <button class="login_button">登录</button>
              </router-link>
          </div>
          <div class="slogan">
              <p>Welcome to my home !</p>
          </div>
      </div>

      <div class="down_body">
          <div class="diary_list_box" v-show="chooseList">
            <diary :diary="diary" v-for="diary in diary_list" :key="diary.id"></diary>
          </div>
          <div class="diary_list_box" v-show="chooseFolder">
            <folder :folder="folder" v-for="folder in folder_list" :key="folder.id" @clickChildFolder="clickParentFolder"></folder>
          </div>
          
          <div class="button_list_box">
              <div class="button_card1" @click="listUseTime()">
                  <div class="button_text">按时间</div>
              </div>
              <div class="button_card2" @click="listUseClass()">
                  <div class="button_text">按分类</div>
              </div>
          </div>

      </div>
    </div> 
</template>

<script>
import Folder from '../components/folder.vue';
import diary from '../components/diary.vue';
import axios from 'axios';
export default {
  name: 'home',
  components:{
    diary,
    Folder
  },
  data(){
    return{
      sign:"",
      chooseList: true,
      chooseFolder: false,
      diary_list:[],
      folder_list:[]
    }
  },
  created(){
    axios.get("http://127.0.0.1:3000/getInformation").then(res=>{
      this.sign = res.data.Information.sign
      })
    axios.get("http://127.0.0.1:3000/diaryList/visitor").then(res=>{
      this.diary_list = res.data.Diary
    })
  },
  methods:{
    listUseTime: function(){
      this.chooseList = true
      this.chooseFolder = false
      axios.get("http://127.0.0.1:3000/diaryList/visitor").then(res=>{
        this.diary_list = res.data.Diary
      })
    },
    listUseClass: function(){
      this.chooseList = false
      this.chooseFolder = true
      axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.folder_list = res.data.diaryClass
      })
    },
    clickParentFolder: function(id){
      axios.get("http://127.0.0.1:3000/diaryListInClass/visitor",{
        params:{
          id
        }
      }).then(res=>{
        this.diary_list = res.data.Diary
      })
      this.chooseList = true
      this.chooseFolder = false
    }
  }
}
</script>

<style>
</style>