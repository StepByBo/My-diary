<template>
    <div class="diary_folder" @click="emitFolder(folder)">
        <p class="folder_text"  v-show="p_folder">{{folder}}</p>
        <input v-model="folder" class="folder_text" v-show="i_folder" />
        <button class="edit_b" @click.stop="clickEdit()" v-show="edit">编辑</button>
        <button class="edit_b" @click.stop="clickYes()" v-show="yes">确定</button>
        <button class="delete_b" @click.stop="clickDelete(folder)">删除</button>
    </div>

</template>

<script>
export default {
  name: 'folderMaster',
  props:['folder'],
  data(){
    return{
        p_folder: true,
        i_folder: false,
        can_enter: true,
        edit: true,
        yes: false
    }
  },
  methods:{
      emitFolder: function(folder){
          if(this.can_enter==true){
              this.$emit('clickChildFolder',folder)
          }         
      },
      clickYes: function(){
          this.p_folder=true
          this.i_folder=false
          this.can_enter=true
          this.edit=true
          this.yes=false
      },
      clickEdit: function(){
          this.p_folder=false
          this.i_folder=true
          this.can_enter=false
          this.edit=false
          this.yes=true
      },
      clickDelete: function(f){
          this.$emit('clickDeleteFolder',f)
      }
  }
}
</script>
<style>
.edit_b{
    margin-top: 10%;
    margin-left: 10%;
    border-radius: 4px;
    border:1px solid #33323252;
    background-color: rgba(160, 192, 223, 0.404);
    width: 42px;
    height: 20px;
    color: #333232;
    font-size: 14px;
    font-family: SimSun;
    cursor: pointer;
}
.delete_b{
    margin-top: 10%;
    width: 42px;
    height: 20px;
    border-radius: 4px;
    border:1px solid #33323252;
    background-color: rgba(160, 192, 223, 0.404);
    color: #333232;
    font-size: 14px;
    font-family: SimSun;
    cursor: pointer;
}
</style>