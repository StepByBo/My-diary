<template>
<div class="login_back">
  <div class="login_box">
    <input placeholder="用户名" class="login_input" v-model="user_name" type="text">
    <input placeholder="密码" class="login_input" v-model="password" type="password">
    <div class="login_button_box">
      <button class="login_button2" @click="logIn()">登录</button>
      <router-link :to="{path:'/'}">
        <button class="login_button2">取消</button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      user_name:"",
      password:""
    }
  },
  created(){
    this.keyupEnter()
  },
  methods:{
    logIn: function(){
      if(this.user_name=="qinhua" && this.password=="1008"){
        this.$router.push('/masterHome')
      }
      else{
        alert("用户名或密码错误，请重新输入！")
      }
    },
    keyupEnter: function(){
      document.onkeydown = e =>{if (e.keyCode === 13 ) {this.logIn()}}
    }
  }
}
</script>

<style>
</style>