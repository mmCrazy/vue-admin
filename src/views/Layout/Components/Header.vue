<template lang="">
    <div id="header">
        头部
    </div>
</template>
<script>
export default {
    name:"Header"
}
</script>
<style lang="scss" scoped>
@import "../../../style/config";
#header {
    position:fixed;
    top: 0;
    left: $navMenu;
    width: 100%;
    height: 75px;
    background-color: pink;
   box-shadow: 0 3px 16px rgba(0, 0, 0, .1);
}
</style>