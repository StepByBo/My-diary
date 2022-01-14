<template>
<div class="login_back">
  <div class="login_box">
    <input placeholder="用户名" class="login_input" v-model="user_name" type="text" v-on:keyup.enter="logIn">
    <input placeholder="密码" class="login_input" v-model="password" type="password" v-on:keyup.enter="logIn">
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
import axios from 'axios';
export default {
  name: 'login',
  data(){
    return{
      user_name:"",
      password:""
    }
  },
  methods:{
    logIn: function(){
      axios.get("http://127.0.0.1:3000/logIn",{
        params:{
          userName:this.user_name,
          password:this.password
        }
      }
      ).then(res=>{
        if(res.data.success==1){
          this.$router.push('/masterHome')
        }
        else{
          alert("用户名或密码错误，请重新输入！")
      }
      })

      
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