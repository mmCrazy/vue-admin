<template>
  <div>
    <el-dialog
      title="收货地址"
      :visible.sync="dialog_info"
      @close="closeDialog"
      :modal-append-to-body='false'
    >

      <el-table>
        123
      </el-table>   

    </el-dialog>

  </div>
</template>
<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialog_info: false
    };
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close", false);
    }
  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        this.dialog_info = newVal;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>