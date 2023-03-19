<template>
  <h2 id="title_rl">热点舆论事件</h2>
  <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="dataSource"
      :pagination-props="paginationProps"
  >
    <template #item="{ item }">
      <a-list-item class="list-demo-item" action-layout="vertical">
        <template #extra>
          <div class="image-area">
            <img alt="arco-design" :src="item.imageSrc" />
          </div>
        </template>
        <a-list-item-meta
            :title="item.title"
            :description="item.description"
        >
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
import { reactive } from 'vue'
import {
  IconHeart,
  IconStar,
  IconMessage,
} from '@arco-design/web-vue/es/icon';
const names = ['三月出游', '俄乌局势', '气候变化'];
const descriptions=[
    '进入3月份，在这个春暖花开的季节，国内有哪些适合去的城市呢？可能有人会说是武汉、青岛，甚至是大理，但这些地方都太过热门了。这里推荐5座适合春季出发的城市，此时也是它们一年中最佳的游玩时间。',
    '当地时间3月9日，乌克兰能源部长哈鲁申科表示，乌克兰基辅州、哈尔科夫州等七个州遭到远程打击，能源基础设施遭破坏，许多地区停电，此次打击持续了六个小时。',
    '3月13日发表在《自然-水》（Nature Water）杂志上的一项新研究表明，过去八年是有记录以来最热的年份，在此期间严重干旱和强降雨事件的发生频率变得更高。',
];
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
];
const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    index: index,
    title: names[index % names.length],
    description: descriptions[index % descriptions.length],
    imageSrc: imageSrc[index % imageSrc.length],
  };
});

export default {
  components:{
    IconHeart,
    IconStar,
    IconMessage,
  },
  setup() {
    return {
      dataSource,
      paginationProps: reactive({
        defaultPageSize: 3,
        total: dataSource.length
      })
    }
  },
}
</script>

<style scoped>
#title_rl{
  margin-top: 10px;
  font-size: 18px;
}
.list-demo-action-layout{
  height: 458.6px;
  text-align: left;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 100px;
  margin-top: 5px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  margin-top: -5px;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>