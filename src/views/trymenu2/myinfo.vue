<template>
  <a-descriptions style="margin-top: 20px" :data="data" :size="size" title="Manager Info" :column="1"/>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('large');

    const data = [{
      label: 'Name',
      value: 'Socrates',
    }, {
      label: 'Users',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];

    return {
      data,
      size
    }
  },
}
</script>
<style scoped>

</style>