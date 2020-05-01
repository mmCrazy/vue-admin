<template lang="">
    <div id="header-wrap">
        <div class="pull-left header-icon"><svg-icon iconClass="menu" className="menu" @click="navMenuState" /></div>
        <div class="pull-right header-icon">
            <div class="user-info pull-left">
                 <img src="../../../assets/images/userHeader.png" alt="">{{username}}
            </div>
            <div class="header-info pull-left" @click="exit">
                <svg-icon iconClass="exit" className="exit" />
            </div>
        </div>
    </div>
</template>
<script>
import store from "../../../store/index";
import { removeToken, removeUserName } from "../../../utils/app";
export default {
  name: "Header",
  data() {
    return {
      username: store.state.app.username
    };
  },
  methods: {
    //设置控制导航菜单栏的展开收起的状态
    navMenuState() {
      this.$store.commit("app/SET_COLLAPSE");
    },
    //退出登陆
    exit() {
      console.log("退出登陆");
      this.$router.push({
        name: "Login"
      });
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      removeToken();
      removeUserName();
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
  // left: $navMenu;
  height: 75px;
  background-color: white;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  @include webkit(transition, all 0.3s ease 0s);

  line-height: 75px;
}
.open {
  #header-wrap {
    left: $navMenu;
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
  // border: 1px solid white;
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