<template lang="">
    <div id="header-wrap">
        <div class="pull-left header-icon"><svg-icon iconClass="menu" className="menu" @click="navMenuState" /></div>
        <div class="pull-right header-icon">
            <div class="user-info pull-left">
                 <img src="../../../assets/images/userHeader.png" alt="">MZH
            </div>
            <div class="header-info pull-left">
                <svg-icon iconClass="exit" className="exit" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    navMenuState() {
      this.$store.commit("SET_COLLAPSE");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: white;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.open {
  #header-wrap {
    // left: $navMenu;
  @include webkit(transition, all 0.3s ease 0s);

  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 26px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border: 1px solid white;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    width: 30px;
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 40px;
  }
}
</style>