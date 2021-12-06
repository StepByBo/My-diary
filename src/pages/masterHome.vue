<template>
    <div>
        <div class="home">
            <div class="head_photo_box">
                <img class="head_photo" src="../assets/img/head.jpg">
                <img class="edit" src="../assets/img/edit.png">
            </div>
            <div class="sign">
                <p>{{mySign}}</p>
                <input v-model="mySign" @blur="finishEditSign($event)" style="display:none">
                <img class="edit" src="../assets/img/edit.png" @click="editSign($event)">
                <button class="logout_button" @click="logOut()">退出</button>
            </div>
            <div class="slogan">
                <p>Master, welcome home !</p>
            </div>
        </div>

        <div class="down_body">
            <div class="diary_list_box" v-show="chooseList">
              <diary-master :diary="diary" v-for="diary in diary_list" :key="diary.id" @clickDelete="deleteDiary"></diary-master>
            </div> 
            <div class="diary_list_box" v-show="chooseFolder">
              <folder-master :folder="folder" v-for="folder in folder_list" :key="folder" @clickChildFolder="clickParentFolder" @clickDeleteFolder="deleteFolder"></folder-master>
            </div>
            
            <div class="button_list_box">
                <div class="button_card1" @click="listUseTime()">
                    <div class="button_text">按时间</div>
                </div>
                <div class="button_card2" @click="listUseClass()">
                    <div class="button_text">按分类</div>
                </div>
                <router-link :to="{path:'/masterNewDiary'}">
                <div class="button_card3">
                    <div class="button_text">写新日记</div>
                </div>
                </router-link>
            </div>
        </div>  

    </div>
</template>

<script>
import folderMaster from '../components/folder-master.vue';
import diaryMaster from '../components/diary-master.vue';
export default {
  name: 'masterHome',
  components:{
    diaryMaster,
    folderMaster
  },
  data(){
    return{
      chooseList: true,
      chooseFolder: false,
      mySign:"This is my diary.",
      showSign: true,
      showEditSign: false,
      diary_list:[],
      diary_list2:[
        {
          id: 0,
          time: "2021年11月15日 20：07",
          text: "今天是星期一"
        },
        {
          id: 1,
          time: "2021年11月16日 20：07",
          text: "今天是星期二"
        },
        {
          id: 2,
          time: "2021年11月17日 20：07",
          text: "今天是星期三"
        },
        {
          id: 3,
          time: "2021年11月18日 20：07",
          text: "今天是星期四"
        },
      ],
      folder_list:[],
      folder_list2:[
        "日常生活11111",
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
    logOut: function(){
      var message = confirm("确定退出登录吗？")
      if(message==true){
        this.$router.push('/')
      }
    },
    clickParentFolder: function(data){
      if(data==this.folder_list[0]){this.diary_list = this.folder1}
      else if(data==this.folder_list[1]){this.diary_list = this.folder2}
      else{this.diary_list = this.folder3}
      this.chooseList = true
      this.chooseFolder = false
    },
    editSign: function(event){
      event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:none")
      event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:inline")
    },
    finishEditSign: function(event){
      event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:inline")
      event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:none")
    },
    deleteDiary: function(id){
      var message = confirm("确定删除这条日记吗？")
      if(message==true){
        for(var i=0;i<this.diary_list.length;i++){
          if(id==this.diary_list[i]['id']){
            this.diary_list.splice(i,1)
          }
        }
      }
    },
    deleteFolder: function(f){
      var message = confirm("确定删除这个文件夹吗？")
      if(message==true){
        for(var i=0;i<this.folder_list.length;i++){
          if(f==this.folder_list[i]){
            this.folder_list.splice(i,1)
          }
        }
      }
    }
  }
}
</script>

<style>
.login_button{
    margin-left: 30%;
    border-radius: 6px;
    border:1px solid #33323252;
    background-color: rgba(217, 229, 240, 0.938);
    width: 46px;
    height: 23px;
    color: #333232;
    font-size: 13px;
    font-family: SimSun;
    cursor: pointer;
}
</style>