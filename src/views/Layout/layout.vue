<template lang="">
    <div id="layout" :class="[isCollapse ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
export default {
  name: "layout",
  components: { LayoutNav, LayoutMain, LayoutHeader },
  computed: {
    isCollapse(){
      return this.$store.state.app.isCollapse
    }
  },
};
</script>
<style lang="scss" scoped>
#layout {
  // background-color: #f7f7f7;
}
</style>