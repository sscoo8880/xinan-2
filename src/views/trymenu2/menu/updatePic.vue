<template>
  <div :style="{marginTop:'20px',marginLeft:'-30px'}">
    <section style="color: forestgreen"></section>
    <h1 :style="{fontsize:'large',marginLeft:'-66px',marginTop:'-15px'}" >患者信息</h1>
    <a-descriptions column=3 :value-style="{width:'33%'}" :label-style="{backgroundColor:'lightsteelblue',color:'black'}" :data="data" size="large"  bordered />
  </div>
  <a-upload
      :style="{marginLeft: '510px',marginTop: '30px'}"
      list-type="picture-card"
      action="/"
      :default-file-list="fileList"
      image-preview
  />

  <section class="container">


  <section style="margin-top: -25px">
  <a-space
      :style="{marginLeft: '-99px',marginTop:'-45px'}"
  >
    <a-button
        type="primary"
        @click="isShow1"
    >
      数据处理
    </a-button>
    <a-button
        type="primary"
        @click="isShow2"
    >
      海马体分割
    </a-button>
    <a-button
        type="primary"
        @click="isShow3"
    >
      分类结果
    </a-button>
  </a-space>
  </section>

  <section
      :style="{marginTop:'22px',marginLeft:'-100px'}"
  >
    <section>
      <a-image
          :src="pic1_1"
          class="show1"
          v-show="show1"
          height="300px"
          style="left: -30px"
          title="数据处理后的图像-1"
      />
      <a-image
          :src="pic1_2"
          class="show1"
          v-show="show1"
          height="300px"
          style="left: -10px"
          title="数据处理后的图像-2"
      />
      <a-image
          :src="pic1_3"
          class="show1"
          v-show="show1"
          height="300px"
          style="left: 10px"
          title="数据处理后的图像-3"
      />
    </section>


    <section>
      <a-image
          :src="pic2_1"
          class="show2"
          v-show="show2"
          width="330px"
          title="2D_Unet"
      />
      <p></p>
      <a-image
          :src="pic2_2"
          class="show2"
          v-show="show2"
          width="330px"
          title="3D-Unet"
          style="margin-top: 20px"
      />
      <p></p>
      <a-image
          :src="pic2_3"
          class="show2"
          v-show="show2"
          width="330px"
          title="transUNet"
          style="margin-top: 20px"
      />
    </section>


    <a-space
        size="large"
        v-show="show3"
        style="font-size: xxx-large"
    >
      <a-statistic title="NC正常" :value="27.58" :precision="2" show-group-separator >
        <template #suffix>%</template>
      </a-statistic>
      <a-statistic title="AD痴呆" :value="72.42" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #suffix>%</template>
      </a-statistic>

    </a-space>

<!--    <a-image-->
<!--        :src="pic1_3"-->
<!--        class="show3"-->
<!--        v-show="show3"-->
<!--        height="300px"-->
<!--        title="分类后的结果"-->
<!--    />-->
  </section>
  </section>
</template>

<script>
// import a from 'src/assets/2.jpg'
export default {
  data(){
    return{
      show1:false,
      show2:false,
      show3:false,
      pic1_1:require('@/assets/1_1.png'),
      pic1_2:require('@/assets/1_2.png'),
      pic1_3:require('@/assets/1_3.png'),
      pic2_1:require('@/assets/2_1.png'),
      pic2_2:require('@/assets/2_2.png'),
      pic2_3:require('@/assets/2_3.png'),
      // src:'src/assets/1.jpg'
    }
  },
  setup() {
    const fileList = [];
    const data = [{
      label: '姓名',
      value: '小帅',
    }, {
      label: '入院日期',
      value: '2020-9-10',
    },{
      label: '诊断情况',
      value: 'AD（痴呆）',
    }, {
      label: '第一紧急人',
      value: '小美'
    }, {
      label: '关系',
      value: '夫妻',
    }, {
      label: '联系人电话',
      value: '1234-123-1234',
    }, {
      label: '第二紧急人',
      value: '小可'
    }, {
      label: '关系',
      value: '父子',
    }, {
      label: '联系人电话',
      value: '9876-987-9876',
    }, {
      label: '家庭住址',
      value: '北京朝阳区XX小区XX楼X-X'
    }];
    return {
      data,
      fileList,
    }
  },
  methods:{
    isShow1(){
      this.show1=true;
      this.show2=false;
      this.show2=false;
    },
    isShow2(){
      this.show1=false;
      this.show2=true;
      this.show3=false;
    },
    isShow3(){
      this.show1=false;
      this.show2=false;
      this.show3=true;
    },
  }

}
</script>
<style>
.container{
  margin-top: 55px;
  /*width: 70%;*/
}
</style>