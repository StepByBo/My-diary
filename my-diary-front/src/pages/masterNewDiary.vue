<template>
    <div>
        <div class="home">
            <div class="head_photo_box">
                <img class="head_photo" src="../assets/img/head.jpg" v-show="p_photo">
                <div v-show="i_photo">
                  <input type="file" style="margin-left: 25%;margin-top: 15%;">
                  <button style="margin-left: 25%;margin-top: 5%;">提交</button>
                </div>
                <button class="photo_button" v-show="edit_photo">编辑</button>
                <button class="photo_button" v-show="confirm_photo">确定</button>
            </div>
            <div class="sign">
                <p v-show="p_sign">{{mySign}}</p>
                <input v-model="mySign" v-show="i_sign">
                <button class="edit" @click="editSign()" v-show="edit_sign">编辑</button>
                <button class="edit" @click="confirmSign()" v-show="confirm_sign">确定</button>
                <button class="edit" @click="logOut()">退出</button>
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
                        <input type="checkbox" :value="cla.id" v-model="classes_value"/>
                        <label>{{cla.name}}</label> 
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
                    <input type="radio" value="0" name="privacy" v-model="set_privacy"/>
                    <label>公开</label>                   
                    <input type="radio" value="1" name="privacy" v-model="set_privacy"/>
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
import axios from 'axios';
import qs from 'qs';
export default {
  name: 'masterNewDiary',
  data(){
    return{
        p_photo:true,
        i_photo:false,
        edit_photo:true,
        confirm_photo:false,
        edit_sign:true,
        confirm_sign:false,
        p_sign:true,
        i_sign:false,
        year: "",
        month: "",
        day: "",
        date: "",
        diary_text: "",
        classes_value: [],
        set_privacy: -1,
        mySign:"",
        nClass: false,
        nClassText: "",
        classes:[]
    }
  },
  created(){
    axios.get("http://127.0.0.1:3000/getInformation").then(res=>{
      this.mySign = res.data.Information.sign
    })
    axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
        this.classes = res.data.diaryClass
    })
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
        else if(this.set_privacy==-1){alert("请设置隐私")} 
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
                var data = {
                    time: this.date,
                    context: this.diary_text,
                    classId: this.classes_value,
                    privacy: this.set_privacy
                }
                axios.post("http://127.0.0.1:3000/addDiary", qs.stringify(data)).then(res=>{
                    alert(res.data.message)
                })
                this.year=""
                this.month=""
                this.day=""
                this.diary_text=""
                this.classes_value=[]
                this.set_privacy=-1
            }
        }
        
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
    newClass: function(){
        this.nClassText = ""
        this.nClass = true
    },
    confirmNewClass: function(){
      if(this.nClassText!=""){
        var data = {name:this.nClassText}
        axios.post("http://127.0.0.1:3000/addDiaryClass",qs.stringify(data)
        ).then(res=>{
          console.log(res.data.message)
          axios.get("http://127.0.0.1:3000/diaryClass").then(res=>{
            this.classes = res.data.diaryClass
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