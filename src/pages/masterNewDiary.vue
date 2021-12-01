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
                <p>Welcome to my home !</p>
            </div>
        </div>

        <div class="down_body">
            <div class="diary_list_box">
                <input placeholder="写新日记吧......" class="edit_new_diary">
            </div>
            <div class="button_list_box">
                <form class="form_box1">
                    <label>添加分类:</label><br>                   
                    <input type="checkbox" value="1" name="folder-class" />
                    <label>日常生活1</label>                    
                    <input type="checkbox" value="2" name="folder-class" />
                    <label>日常生活2</label>                    
                    <input type="checkbox" value="2" name="folder-class" />
                    <label>日常生活3</label>
                    <input type="checkbox" value="2" name="folder-class" />
                    <label>日常生活4</label>
                    <button class="new-class-button">new</button>
                </form>
                <form class="form_box2">
                    <label>设置隐私:</label><br>                    
                    <input type="radio" value="1" name="privacy" />
                    <label>公开</label>                   
                    <input type="radio" value="2" name="privacy" />
                    <label>仅自己可见</label>
                </form>
                <div class="botton_list_box2">
                    <div id="button_card4">
                        <div class="button_text" @click="returnToMasterHome()">返回</div>
                    </div>
                    <div id="button_card4">
                        <div class="button_text">确定发布</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'masterNewDiary',
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
    }
  }
}
</script>

<style>
</style>