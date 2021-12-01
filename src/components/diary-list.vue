<template>
    <div class="diary_list_box" v-show="show">
      <div class="diary_card" v-for="diary in diarys" :key="diary.id"> 
          <p class="time">{{diary.time}}</p>
          <p class="diary_text">{{diary.text}}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'diaryList',
  props:['show','diarys']
}
</script>

<style>
</style>