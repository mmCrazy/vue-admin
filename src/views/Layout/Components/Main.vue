<template lang="">
    <div id="main">
    <router-view />
    </div>
</template>
<script>
export default {
    name:"Main"
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";
#main {
  position: fixed;
  top: 75px;
  right: 0;
  left: $navMenu;
  height: 100%;
  width: 100%;
  border: 30px solid #f7f7f7;
  background-color: rgb(131, 250, 151);
}
</style>