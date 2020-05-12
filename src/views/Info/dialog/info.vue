<template>
  <div>
    <el-dialog
      :title="DataInfo.value"
      :visible.sync="dialog_info"
      @close="closeDialog"
      :modal-append-to-body='false'
      width="580px"
      @open="openDialog"
      @getList="getList"
    >

      <el-form
        ref="form"
        :model="form"
        label-width="70px"
      >

        <el-form-item label="类别">
          <el-select
            v-model="form.category"
            placeholder="请输入类别"
          >
            <el-option
              v-for="item in category"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model="form.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="概述">
          <el-input
            type="textarea"
            v-model="form.content"
            placeholder="请输入概述"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="submit_loading_type"
          >确认</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>
<script>
import { AddInfo, EditInfo } from "../../../api/news";
export default {
  name: "dialogInfo",
  data() {
    return {
      // 控制表单显示和隐藏
      dialog_info: false,
      // 表单数据
      form: {
        id: "",
        category: "",
        title: "",
        content: ""
      },
      // 提交按钮loading状态
      submit_loading_type: false
    };
  },
  props: {
    // 弹窗
    flag: {
      type: Boolean,
      default: false
    },
    // 分类的数据
    category: {
      type: Array,
      default: () => []
    },
    // 信息列表是新增还是修改
    DataInfo: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  methods: {
    // 判断是否为修改
    addAndedit() {},
    // 窗口打开的时候触发
    openDialog() {
      // console.log(this.DataInfo.info);
      // console.log(this.category);
      if (this.DataInfo.value == "修改") {
        this.form.id = this.DataInfo.info.id;
        this.form.category = this.DataInfo.info.categoryId;
        this.form.title = this.DataInfo.info.title;
        this.form.content = this.DataInfo.info.content;
      }
    },
    // 刷新列表
    getList() {
      this.$emit("getList");
    },
    // 取消提交
    closeDialog() {
      // 重置表单
      this.resetFields();
      // 关闭窗口
      this.$emit("close", false);
    },
    // 重置表单
    resetFields() {
      this.form.category = "";
      this.form.title = "";
      this.form.content = "";
    },
    // 提交表单
    onSubmit() {
      if (!this.form.category) {
        this.$message({
          message: "分类不能为空",
          type: "error"
        });
        return false;
      }
      // 按钮loading状态
      this.submit_loading_type = true;
      if (this.DataInfo.value == "新增") {
        let form = {
          category: this.form.category,
          title: this.form.title,
          content: this.form.content
        };
        AddInfo(form)
          .then(response => {
            let data = response.data;
            // console.log(data);
            this.$message({
              message: data.message,
              type: "success"
            });
            // 按钮loading状态
            this.submit_loading_type = false;
            // 重置表单
            this.resetFields();
            // this.$refs["form"].resetFields();
            // 刷新列表
            this.getList();
          })
          .catch(error => {
            // 按钮loading状态
            this.submit_loading_type = false;
            console.log(error);
          });
      }
      if (this.DataInfo.value == "修改") {
        let form = {
          id: this.form.id,
          categoryId: this.form.category,
          title: this.form.title,
          content: this.form.content
        };
        EditInfo(form)
          .then(response => {
            let data = response.data;
            // console.log(data);
            this.$message({
              message: data.message,
              type: "success"
            });
            // 按钮loading状态
            this.submit_loading_type = false;
            // // 重置表单
            // this.resetFields();
            // this.$refs["form"].resetFields();
            // 刷新列表
            this.getList();
          })
          .catch(error => {
            // 按钮loading状态
            this.submit_loading_type = false;
            console.log(error);
          });
      }

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