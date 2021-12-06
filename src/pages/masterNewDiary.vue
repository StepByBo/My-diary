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
                <p>Welcome to my home !</p>
            </div>
        </div>

        <div class="down_body">
            <div class="diary_list_box">
                <div class="edit_date_box">
                    <input class="edit_date" v-model="year">年
                    <input class="edit_date" v-model="month">月
                    <input class="edit_date" v-model="day">日
                </div>   
                <textarea placeholder="写新日记吧......" class="edit_new_diary" v-model="diary_text"></textarea>
            </div>
            <div class="button_list_box">
                <div class="form_box1">
                    <label>添加分类:</label><br>
                    <div style="display:inline" v-for="(cla, index) in classes" :key="index">
                        <input type="checkbox" :value="cla.value" v-model="classes_value"/>
                        <label>{{cla.text}}</label> 
                    </div>             
                    <button class="new-class-button" @click="newClass()">new</button>
                    <div v-show="nClass">
                        <input v-model="nClassText" style="width:60%">
                        <button class="new-class-button" @click="confirmNewClass()">确定</button>
                        <button class="new-class-button" @click="cancel()">取消</button>
                    </div>
                    
                </div>
                <div class="form_box2">
                    <label>设置隐私:</label><br>                    
                    <input type="radio" value="1" name="privacy" v-model="set_privacy"/>
                    <label>公开</label>                   
                    <input type="radio" value="2" name="privacy" v-model="set_privacy"/>
                    <label>仅自己可见</label>
                </div>
                <div class="botton_list_box2">
                    <div class="button_card4">
                        <div class="button_text" @click="returnToMasterHome()">返回</div>
                    </div>
                    <div class="button_card4">
                        <div class="button_text" @click="publish()">确定发布</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'masterNewDiary',
  data(){
    return{
        year: "",
        month: "",
        day: "",
        date: "",
        diary_text: "",
        classes_value: [],
        set_privacy: 0,
        mySign:"This is my diary.",
        nClass: false,
        nClassText: "",
        classes:[
            {
                text:"日常生活1",
                value:1
            },
            {
                text:"日常生活2",
                value:2
            },
            {
                text:"日常生活3",
                value:3
            },
        ]
    }
  },
  methods:{
   logOut: function(){
      var message = confirm("确定退出登录吗？")
      if(message==true){
        this.$router.push('/')
      }
    },
    returnToMasterHome: function(){
      var message = confirm("确定返回主页吗？")
      if(message==true){
        this.$router.push('/masterHome')
      }  
    },
    publish: function(){
        if(this.year==""){alert("请输入年份")}
        else if(this.month==""){alert("请输入月份")}
        else if(this.day==""){alert("请输入日期")}
        else if(this.diary_text==""){alert("请日记内容")}
        else if(this.classes_value.length==0){alert("请选择日记分类")}
        else if(this.set_privacy==0){alert("请设置隐私")} 
        else{
            var message = confirm("确定发布吗？")
            if(message==true){
                var time = new Date()
                var hour = time.getHours()
                hour = hour < 10 ? "0" + hour : hour
                var minute = time.getMinutes()
                minute = minute < 10 ? "0" + minute : minute
                var second = time.getSeconds()
                second = second < 10 ? "0" + second : second
                this.date = this.year+"年"+this.month+"月"+this.day+"日"+" "+hour+":"+minute+":"+second
                var obj = {
                date: this.date,
                diary_text: this.diary_text,
                classes: this.classes_value,
                set_privacy:this.set_privacy
                }
                console.log(obj)
                console.log(this.classes_value)
            }
        }
        
    },
    editSign: function(event){
        event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:none")
        event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:inline")
    },
    finishEditSign: function(event){
        event.currentTarget.parentNode.childNodes[0].setAttribute("style","display:inline")
        event.currentTarget.parentNode.childNodes[1].setAttribute("style","display:none")
    },
    newClass: function(){
        this.nClassText = ""
        this.nClass = true
    },
    confirmNewClass: function(){
        if(this.nClassText!=""){
            var newC = {
            text:this.nClassText,
            value:this.classes.length+1
        }
        this.classes.push(newC)
        this.nClass = false
        } 
    },
    cancel: function(){
        this.nClass = false
    }
  }
}
</script>

<style>
.form_box1{
    width: 20%;
    height: 150px;
    background-color: #b1cbe4da;
    border-radius: 10px;
    position: fixed;
    top: 30%;
    right: 5%;
    padding: 5px 7px 5px 7px;
    color: #333232;
    font-size: 16px;
    font-family: SimSun;
    line-height: 20px;
}
.form_box2{
    width: 20%;
    height: 55px;
    background-color: #b1cbe4da;
    border-radius: 10px;
    position: fixed;
    padding: 5px 7px 5px 7px;
    top: 60%;
    right: 5%;
    padding: 5px;
    color: #333232;
    font-size: 16px;
    font-family: SimSun;
    line-height: 25px;
}
.botton_list_box2{
    width: 20%;
    position: fixed;
    right: 5%;
    bottom: 15%;
    display: flex;
    justify-content: space-around;
}
.button_card4{
    width: 100px;
    height: 50px;
    display: inline-block;
    background-color: #b1cbe4da;
    border-radius: 10px;
    display: flex;
    align-items:center;
    cursor: pointer;
}
.new-class-button{
    width: 35px;
    height: 20px;
    border-radius: 4px;
    border:1px solid #333232a9;
    color: #333232;
    font-size: 13px;
    background-color: rgb(217, 229, 240);
    color: #333232;
    margin-left: 5px;
}
</style>