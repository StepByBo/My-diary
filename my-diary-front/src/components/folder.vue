<template>
    <div class="diary_folder" @click="emitFolder(folder)">
        <p class="folder_text">{{folder.name}}</p>
    </div>

</template>

<script>
export default {
  name: 'Folder',
  props:['folder'],
  methods:{
      emitFolder: function(folder){
        this.$emit('clickChildFolder',folder.id)
      }
  }
}
</script>
<style>
</style>