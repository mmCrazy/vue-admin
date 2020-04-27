<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String, //定义接受类型
      default: ""
    },
    className: {
      type: String, //定义接受类型
      default: ""
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  created() {
    // console.log(this.iconClass); //父组件中iconClass传入的值，这里我用来调试
    // console.log(this.className);
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
 .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>