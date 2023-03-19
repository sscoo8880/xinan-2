<!--中间小框统一格式，不用改-->
<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "B-Page"
}
</script>

<style scoped>
.item{
  /*height: 704px;*/
  /*border: 1px solid blue;*/
  margin: .25rem;
  /*height: 200px;*/
  /*margin-left: 15px;*/
  /*background-color: rgba(12,130,255,.5);*/
  /*background-color: rgba(12,130,255,.3);*/

}
</style>