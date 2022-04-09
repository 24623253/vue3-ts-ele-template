<template>
  <div class="home">
    <!-- 欢迎语 -->
    <div class="welcomeCon">
      <div>{{ wel }}
      </div>
    </div>
  </div>

</template>
<script setup name="Index">
const wel = ref('欢迎来到核算系统')


</script>
<style scoped>
.welcomeCon {
  height: calc(100vh - 84px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  height: 100%;
}
</style>



