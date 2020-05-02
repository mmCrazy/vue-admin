<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_info"
      @close="closeDialog"
      :modal-append-to-body='false'
      width="580px"
    >

      <el-form
        ref="form"
        :model="form"
        label-width="70px"
      >

        <el-form-item label="类别">
          <el-select
            v-model="form.region"
            placeholder="请输入类别"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概述">
          <el-input type="textarea" v-model="form.name" placeholder="请输入概述"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
          >确认</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>
<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialog_info: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
    },

    onSubmit() {
      console.log("submit!");
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