<template lang="">
    <div id="layout" :class="[isCollapse ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import LayoutNav from "./Components/Nav";
import LayoutMain from "./Components/Main";
import LayoutHeader from "./Components/Header";
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