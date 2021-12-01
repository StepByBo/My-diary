<template>
    <div class="diary_list_box" v-show="show">
        <div class="diary_folder" v-for="folder in folders" :key="folder.id" @click="emitFolder(folder)">
            <p class="folder_text">{{folder}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'diaryFolder',
  props:['show','folders'],
  methods:{
      emitFolder: function(folder){
          this.$emit('clickChildFolder',folder)
      }
  }
}
</script>

<style>
</style>