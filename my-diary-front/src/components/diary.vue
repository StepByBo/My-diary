<template>
    <div class="diary_card"> 
        <p class="time">{{diary.time}}</p>
        <p class="diary_text">{{diary.context}}</p>
    </div>
</template>

<script>
export default {
  name: 'diary',
  props:['diary']
}
</script>

<style>
</style>