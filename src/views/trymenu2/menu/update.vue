<template>
  <section class="top_container">
    <a-upload draggable action="/"/>
  </section>

  <section class="bottom_container">
    <a-upload action="/submit" :default-file-list="fileList" />
  </section>

</template>

<script>
export default {
  setup() {
    const fileList = [
      {
        uid: '-1',
        name: 'ice.png',
        url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
      },
      {
        status: 'error',
        uid: '-2',
        percent: 0,
        response: '上传错误提示',
        name: 'cat.png',
        url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
      },
      {
        uid: '-3',
        name: 'light.png',
        url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      },
    ];

    return {
      fileList
    }
  },
};
</script>

<style scoped lang="scss">
@import '../../../style/_Edit';
#icons{
  margin-top: 20%;
}

.top_container{
  margin-left: 17%;
  box-sizing: border-box;
  width: 800px;
  padding: 0px;
  border: 30px solid rgb(var(--gray-2));
}

.bottom_container{
  background-color: #f2f3f5;
  margin-top: 20px;
  margin-left: 17%;
  box-sizing: border-box;
  width: 800px;
  padding: 20px;
  border: 3px solid rgb(var(--gray-2));
}
</style>
