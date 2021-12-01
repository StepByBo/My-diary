<template>
    <div>
        <div class="home">
            <div id="head_photo_box">
                <img id="head_photo" src="../assets/img/head.jpg">
                <img class="edit" src="../assets/img/edit.png">
            </div>
            <div id="sign">
                <p>This is my diary.</p>
                <img class="edit" src="../assets/img/edit.png">
                <button class="logout_button" @click="logOut()">退出</button>
            </div>
            <div id="slogan">
                <p>Master, welcome home !</p>
            </div>
        </div>

        <div class="down_body">
            <diary-list-master :show="chooseList" :diarys="diary_list"></diary-list-master>
            <diaryFolder :show="chooseFolder" :folders="folder_list" @clickChildFolder='clickParentFolder'></diaryFolder>
            
            <div class="button_list_box">
                <div id="button_card1" @click="listUseTime()">
                    <div class="button_text">按时间</div>
                </div>
                <div id="button_card2" @click="listUseClass()">
                    <div class="button_text">按分类</div>
                </div>
                <router-link :to="{path:'/masterNewDiary'}">
                <div id="button_card3">
                    <div class="button_text">写新日记</div>
                </div>
                </router-link>
            </div>
        </div>  

    </div>
</template>

<script>
import diaryFolder from '../components/diary-folder.vue';
import diaryListMaster from '../components/diary-list-master.vue';
export default {
  name: 'masterHome',
  components:{
    diaryListMaster,
    diaryFolder
  },
  data(){
    return{
      chooseList: true,
      chooseFolder: false,
      diary_list:[],
      diary_list2:[
        {
          time: "2021年11月15日 20：07",
          text: "今天是星期一"
        },
        {
          time: "2021年11月16日 20：07",
          text: "今天是星期二"
        },
        {
          time: "2021年11月17日 20：07",
          text: "今天是星期三"
        },
        {
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
    }
  }
}
</script>

<style>
</style>