<template>
    <div id="app">
      <div class="home">
          <div id="head_photo_box">
              <img id="head_photo" src="../assets/img/head.jpg">
          </div>
          <div id="sign">
              <p>This is my diary.</p>
              <router-link :to="{path:'/login'}">
                <button class="login-button">登录</button>
              </router-link>
          </div>
          <div id="slogan">
              <p>Welcome to my home !</p>
          </div>
      </div>

      <div class="down_body">
          <diaryList :show="chooseList"></diaryList>
          <diaryFolder :show="chooseFolder"></diaryFolder>
          
          <div class="button_list_box">
              <div id="button_card1" @click="listUseTime()">
                  <div class="button_text">按时间</div>
              </div>
              <div id="button_card2" @click="listUseClass()">
                  <div class="button_text">按分类</div>
              </div>
          </div>

      </div>
    </div> 
</template>

<script>
import diaryFolder from '../components/diary-folder.vue';
import diaryList from '../components/diary-list.vue';
export default {
  name: 'home',
  components:{
    diaryList,
    diaryFolder
  },
  data(){
    return{
      chooseList: true,
      chooseFolder: false
    }
  },
  methods:{
    listUseTime: function(){
      this.chooseList = true
      this.chooseFolder = false
    },
    listUseClass: function(){
      this.chooseList = false
      this.chooseFolder = true
    }
  }
}
</script>

<style>
</style>