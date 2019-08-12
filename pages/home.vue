<template>
  <h1 style="margin-top: 300px">欢迎访问</h1>
</template>

<script>
import authorityJson from "../mock/authority.json";
export default {
  name: "home",
  created() {
    this.initMenu();
  },
  methods: {
    //初始化菜单
    initMenu() {
      this.$store.commit("initSystem", authorityJson.systemList);
      this.$store.commit("initMainMenu", authorityJson.menuList);
      this.$store.commit("initMenu", {
        serverRouters: authorityJson.serverRouters,
        vm: this
      });
      
      // this.$store.commit("initTag");
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 40px;
  text-align: center;
}
</style>

