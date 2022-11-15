<template>
  <a-typography-title id="title-l" align="left" >
    创建调查问卷
  </a-typography-title>
  <div >
    <label class="pull-left" id="spanName"><span style="color:red;left: -10px;top: 5px;position: absolute;">*</span>问卷名称：</label>
    <a-textarea id="style-name" placeholder="请输入问卷名称..." allow-clear/>
  </div>
  <div >
    <label class="pull-left" id="spanName1"><span style="color:red;left: -10px;top: 5px;position: absolute;">*</span>问卷说明：</label>
    <a-textarea id="style-name1" placeholder="请输入问卷说明..." allow-clear/>
  </div>
  <a-button type="primary" @click="create_question" id="a-button-create">创建问卷</a-button>
</template>

<script>
export default {

  name: "user_create_questionnaire",
  methods:{
    create_question(){
      this.$router.push({name:'design_questionnaire', params: {id: 0}})
    }
  }
}
</script>

<style scoped>

#spanName{
  position: absolute;
  left: 3%;
  top: 210%;
  font-weight:bold;
  color: #1ebbff;
  font-size: 25px;
}

#spanName1{
  position: absolute;
  left: 3%;
  top: 410%;
  font-weight:bold;
  color: #1ebbff;
  font-size: 25px;
}

#style-name{
  position: absolute;
  left: 15%;
  top: 200%;
  width: 500px;
  height: 100px;
  background-color: white;
}

#style-name1{
  position: absolute;
  left: 15%;
  top: 400%;
  width: 700px;
  height: 200px;
  background-color: white;
}

#title-l{
  position: relative;
  left: -5%;
  font-size: 25px;
  color: #1ed6ff;
}

#a-button-create{
  position: absolute;
  left: 35%;
  top: 750%;
  width: 200px;
  height: 40px;
  font-weight:bold;
  font-size: 15px;
}

</style>
