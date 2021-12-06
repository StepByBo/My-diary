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
.login_back{
    background-color: #a7ccf1c0;
    min-height: 100vh;
    min-width: 100vh;
    position: relative;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #cccccc85;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -225px;
}
.login_input{
    display: block;
    width: 230px;
    height: 30px;
    margin: 40px auto;
}
.login_button_box{
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: space-around;
}
.login_button2{
    width: 65px;
    height: 35px;
    border: 1px solid;
    border-radius: 8px;
    background-color: #a7ccf1c0;
    cursor: pointer;
}

</style>