<!--左右四个小框统一格式，不用改-->
<template>
  <div class="item">
    <slot></slot>

  </div>
</template>

<script>
export default {
  name: "rlPage"
}
</script>

<style scoped>
.item{
  /*height: 350px;*/
  border: 1px solid blue;
  margin: .25rem;
  height: 700px;
  background-color: rgba(12,130,255,.5);
}
</style>