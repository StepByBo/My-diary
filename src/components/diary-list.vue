<template>
  <div class="diary_list_box" v-show="show">
        <div class="diary_card">
            <p class="time">2021年11月15日 20：07</p>
            <p class="diary_text">今天是星期一</p>
        </div>
        <div class="diary_card">
            <p class="time">2021年11月16日 20：07</p>
            <p class="diary_text">今天是星期二</p>
        </div>
        <div class="diary_card">
            <p class="time">2021年11月17日 20：07</p>
            <p class="diary_text">今天是星期三</p>
        </div>
        <div class="diary_card">
            <p class="time">2021年11月18日 20：07</p>
            <p class="diary_text">今天是星期四</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'diaryList',
  props:['show']
}
</script>

<style>
</style>