<template>
<h1>回答问卷</h1>
  <div id="background-r">
    <div id="form">
      <a-descriptions column="1" direction="horizontal" >
        <a-descriptions-item label="id:">{{$route.query.id}}</a-descriptions-item>
        <a-descriptions-item label="问卷名称：">{{$route.query.name}}</a-descriptions-item>
        <a-descriptions-item label="发布时间：">{{$route.query.date}}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: "to_answer_questionnaire"
}
</script>

<style scoped>

#background-r {
  background: url("../../../assets/login_background.jpg") no-repeat center;
  top: 70px;
  left: 0;
  position: fixed;
}
#form{
  position: absolute;
  top: 10%;
  left: 5%;
}
</style>