<template lang="">
    <div id="layout">
        <LayoutHeader/>
        <LayoutNav/>
        <LayoutMain/>
    </div>
</template>
<script>
import LayoutNav from "./Components/Nav";
import LayoutMain from "./Components/Main";
import LayoutHeader from "./Components/Header";
export default {
  name: "layout",
  components: { LayoutNav, LayoutMain, LayoutHeader }
};
</script>
<style lang="scss" scoped>
#layout {
    // background-color: #f7f7f7;
}
</style>