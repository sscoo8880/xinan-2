<template>
  <a-form>
    <a-page-header className="title" title="返回" @back="$router.back()" style="padding: 0"/>
  </a-form>
  <background/>
  <p v-if="flag===0">
    <phonerep @onEvent="getchange"/>
  </p>
  <p v-else-if="flag===1">
    <userrep @onEvent="getchange"/>
  </p>
  <p v-else-if="flag===2">
    <repass/>
  </p>
</template>

<script>
import background from "@/components/background/background";
import phonerep from "@/components/repasswd/phonerep";
import userrep from "@/components/repasswd/userrep";
import repass from "@/components/repasswd/repass";

export default {
  name: "repasswd",
  data() {
    return {
      flag: 0,

    }
  },
  components: {
    background,
    phonerep,
    userrep,
    repass,
  },
  methods: {
    getchange(data) {
      this.flag = data
    },
  }

}
</script>

<style scoped>

</style>