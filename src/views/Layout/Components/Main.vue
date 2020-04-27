<template lang="">
    <div id="main-wrap">
      <div class="main-content">
        <div class="content"><router-view /></div>
      </div>
    
    </div>
</template>
<script>
export default {
    name:"Main"
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";
#main-wrap {
  height: 100vh;
  
}
.main-content{
  position: fixed;
  top: 75px;
  right: 0;
  left: $navMenu;
  height: 100%;
  width: 100%;
  border: 30px solid #f7f7f7;
  background-color: #fff;
}
</style>