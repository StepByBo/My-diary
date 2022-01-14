<template>
    <div>
        <div class="home">
            <div class="head_photo_box">
                <img class="head_photo" src="../assets/img/head.jpg" v-show="p_photo">
                <div v-show="i_photo">
                  <input type="file" name="file" accept="image/*" ref="avatarInput" style="margin-left: 25%;margin-top: 15%;">
                  <button style="margin-left: 25%;margin-top: 5%;" class="photo_button">提交</button>
                </div>
                <button class="photo_button" v-show="edit_photo">编辑</button>
            </div>
            <div class="sign">
                <p v-show="p_sign">{{mySign}}</p>
                <input v-model="mySign" v-show="i_sign">
                <button class="edit" @click="editSign()" v-show="edit_sign">编辑</button>
                <button class="edit" @click="confirmSign()" v-show="confirm_sign">确定</button>
                <button class="edit" @click="logOut()">退出</button>
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
              <folder-master :folder="folder" v-for="folder in folder_list" :key="folder.id" @clickChildFolder="clickParentFolder" @clickDeleteFolder="deleteFolder" 
              @editFolderName="editFolder"></folder-master>
              <button class="new-class" @click="newClass()">添加新分类</button>
                <div v-show="nClass" style="display:inline-block;margin-left:5%">
                    <input v-model="nClassText" style="width:300px;height:30px">
                    <button class="n-class-button" @click="confirmNewClass()">确定</button>
                    <button class="n-class-button" @click="cancel()">取消</button>
                </div>
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
import axios from 'axios';
import qs from 'qs';
export default {
  inject:['reload'],
  name: 'masterHome',
  components:{
    diaryMaster,
    folderMaster
  },
  data(){
    return{
      p_photo:true,
      i_photo:false,
      edit_photo:true,
      edit_sign:true,
      confirm_sign:false,
      p_sign:true,
      i_sign:false,
      chooseList: true,
      chooseFolder: false,
      mySign:"",
      showSign: true,
      showEditSign: false,
      nClass: false,
      nClassText:"",
      diary_list:[],
      folder_list:[]
    }
  },
  created(){
    axios.get("http://127.0.0.1:3000/getInformation").then(res=>{
      this.mySign = res.data.Information.sign
    })
    axios.get("http://127.0.0.1:3000/diaryList/master").then(res=>{
      this.diary_list = res.data.Diary
    })
  },
  methods:{
    refreshDiaryList: function(){
      axios.get("http://127.0.0.1:3000/diaryList/master").then(res=>{
        this.diary_list = res.data.Diary
      })
    },
    listUseTime: function(){
      this.chooseList = true
      this.chooseFolder = false
      this.refreshDiaryList()
    },
    listUseClass: function(){
      this.chooseList = false
      this.chooseFolder = true
      this.useTimeOrClass = false
      axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.folder_list = res.data.diaryClass
      })
    },
    logOut: function(){
      var message = confirm("确定退出登录吗？")
      if(message==true){
        this.$router.push('/')
      }
    },
    clickParentFolder: function(id){
      axios.get("http://127.0.0.1:3000/diaryListInClass/master",{
        params:{
          id
        }
      }).then(res=>{
        this.diary_list = res.data.Diary
        this.chooseList = true
        this.chooseFolder = false
      })  
    },
    editFolder: function(id,name){
      var data = {id,name}
      axios.put("http://127.0.0.1:3000/modifyDiaryClassName", qs.stringify(data)
      ).then(res=>{
        alert(res.data.message)
        axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.folder_list = res.data.diaryClass
      })
      })
    },
    editSign: function(){
      this.p_sign = false
      this.i_sign = true
      this.edit_sign = false
      this.confirm_sign = true
    },
    confirmSign: function(){
      var data = {sign:this.mySign}
      axios.put("http://127.0.0.1:3000/modifySign", qs.stringify(data)
      ).then(res=>{
        this.mySign = res.data.Information.sign
      })
      this.p_sign = true
      this.i_sign = false
      this.edit_sign = true
      this.confirm_sign = false
    },
    deleteDiary: function(id){
      var message = confirm("确定删除这条日记吗？")
      if(message==true){
        axios.delete("http://127.0.0.1:3000/deleteDiary", {
          params:{
            id
          }
        }
        ).then(res=>{
          alert(res.data.message)
          axios.get("http://127.0.0.1:3000/diaryList/master").then(res=>{
          this.diary_list = res.data.Diary
        })
    })
      }
    },
    deleteFolder: function(id){
      var message = confirm("确定删除这个文件夹吗？这将同时删除这个文件夹中的所有日记！")
      if(message==true){
        axios.delete("http://127.0.0.1:3000/deleteDiaryClassAndItsDiaries",{
          params:{
            id
          }
        }
        ).then(res=>{
          alert(res.data.message)
          axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
            this.folder_list = res.data.diaryClass
          })
        })
        
      }
    },
    newClass: function(){
        this.nClass = true
    },
    confirmNewClass: function(){
      if(this.nClassText!=""){
        var data = {name:this.nClassText}
        axios.post("http://127.0.0.1:3000/addDiaryClass", qs.stringify(data)
        ).then(res=>{
          alert(res.data.message)
          axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
          this.folder_list = res.data.diaryClass
          })
          this.nClass = false
        })
      } 
    },
    cancel: function(){
        this.nClass = false
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
.new-class{
  width: 100px;
  height: 50px;
  background-color: #cccccc52;
  border-radius: 10px;
  border:1px solid #33323252;
  margin: 50px 0 0 20%;
}
.n-class-button{
  width: 50px;
  height: 30px;
  border-radius: 4px;
  border:1px solid #333232a9;
  color: #333232;
  font-size: 13px;
  background-color: rgb(217, 229, 240);
  color: #333232;
  margin-left: 10px;
}
</style>