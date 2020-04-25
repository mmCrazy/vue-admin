<template>
<div></div>
    <!-- <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg> -->
</template>
<script>
export default {
    name:"svgIcon",
    props:{
        iconClass:{
            type: Boolean, //定义接受类型
            default:''
        },
       className:{
            type: Boolean, //定义接受类型
            default:''
        }
    },
    data(){
        return {
            msg:""
        }
    },
    created() {
        console.log(this.$props.iconClass);
        console.log(this.$props.className);
    },
}
</script>
<style lang="scss" scoped>

</style>