<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script>
export default {
  mounted () {
    // this.$store.commit("initSystem", authorityJson.systemList);

    // this.$store.commit("initMainMenu", authorityJson.menuList);
    // this.$store.commit("initMenu", {serverRouters: authorityJson.serverRouters,
    // vm: this
    // });
    // this.$store.commit("initTag");
    // this.$router.push({ name: "home" });
  }
}
</script>



<style>
html,body,#app{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
