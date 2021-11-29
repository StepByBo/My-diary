<template>
  <div class="diary_list_box" v-show="show">
            <div class="diary_folder">
                <p class="folder_text">日常生活1</p>
            </div>
            <div class="diary_folder">
                <p class="folder_text">日常生活2</p>
            </div>
            <div class="diary_folder">
                <p class="folder_text">日常生活3</p>
            </div>
        </div>
</template>

<script>
export default {
  name: 'diaryFolder',
  props:['show']
}
</script>

<style>
</style>