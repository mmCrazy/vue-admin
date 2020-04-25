<template lang="">
    <div id="navbar">
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
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{ item.meta.name}}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu> 
        <svg-icon iconClass="true" className="false"></svg-icon>
    </div>
</template>
<script>
export default {
  name: "navMenu",
  data() {
    return {
      isCollapse: false,
      routers: this.$router.options.routes,
    };
  },
  created() {
      
  },
  mounted() {
    console.log(this.routers);
    },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100%;
  background-color: skyblue;
}
</style>