<template lang="">
    <div id="nav-wrap">
      <h1 class="logo"><img src="../../../assets/images/logo.jpg" alt=""></h1>
        <el-menu default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose"
         :collapse="isCollapse" 
         background-color="transparent" 
         text-color="#fff" 
         active-text-color="#fff" 
         router>
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!-- 一级菜单 -->
                    <template slot="title">
                    <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />                  
                    <span slot="title">{{ item.meta.name}}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu> 
    </div>
</template>
<script>
export default {
  name: "navMenu",
  data() {
    return {
      // isCollapse: false,
      routers: this.$router.options.routes
    };
  },
  created() {},
  mounted() {
    // console.log(this.routers);
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  computed: {
     isCollapse(){
       return this.$store.state.isCollapse;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";
.logo{
  img{
    width: 100%;
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100%;
  // background-color: rgba(43, 49, 63, .8);
  background-image: linear-gradient(to bottom, #19202b , #535863);
  svg{
    font-size: 20px;
    margin-right: 10px;
  }
}

</style>