<template>
    <div id="app">
      <div class="home">
          <div class="head_photo_box">
              <img class="head_photo" src="../assets/img/head.jpg">
          </div>
          <div class="sign">
              <p>This is my diary.</p>
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
            <folder :folder="folder" v-for="folder in folder_list" :key="folder" @clickChildFolder="clickParentFolder"></folder>
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
export default {
  name: 'home',
  components:{
    diary,
    Folder
  },
  data(){
    return{
      chooseList: true,
      chooseFolder: false,
      diary_list:[],
      diary_list2:[
        {
          time: "2021年11月15日 20：07",
          text: "今天是星期一",
          privacy:0
        },
        {
          time: "2021年11月16日 20：07",
          text: "今天是星期二",
          privacy:0
        },
        {
          time: "2021年11月17日 20：07",
          text: "今天是星期三",
          privacy:0
        },
        {
          time: "2021年11月18日 20：07",
          text: "今天是星期四",
          privacy:1
        },
      ],
      folder_list:[],
      folder_list2:[
        "日常生活1",
        "日常生活2",
        "日常生活3",
      ],
      folder1:[
        {
          time: "2021年11月15日 20：07",
          text: "今天是星期一"
        }
      ],
      folder2:[
        {
          time: "2021年11月15日 20：07",
          text: "今天是星期2"
        }
      ],
      folder3:[
        {
          time: "2021年11月15日 20：07",
          text: "今天是星期3"
        }
      ]
    }
  },
  created(){
    this.init()
  },
  methods:{
    init: function(){
      this.diary_list = this.diary_list2
    },
    listUseTime: function(){
      this.chooseList = true
      this.chooseFolder = false
      this.diary_list = this.diary_list2
    },
    listUseClass: function(){
      this.chooseList = false
      this.chooseFolder = true
      this.folder_list = this.folder_list2
    },
    clickParentFolder: function(data){
      if(data==this.folder_list[0]){this.diary_list = this.folder1}
      else if(data==this.folder_list[1]){this.diary_list = this.folder2}
      else{this.diary_list = this.folder3}
      this.chooseList = true
      this.chooseFolder = false
    }
  }
}
</script>

<style>
</style>