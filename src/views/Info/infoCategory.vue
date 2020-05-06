<template>
  <div id="category">
    <el-button
      type="danger"
      @click="addFirst"
    >添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="firstItem in category.item"
              :key="firstItem.id"
            >
              <!--一级分类-->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{firstItem.category_name}}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="editCategory()"
                    round
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    round
                    @click="handlerAddChildren()"
                  >添加子级</el-button>
                  <el-button
                    size="mini"
                    round
                    @click="deleteCategoryComfirm()"
                  >删除</el-button>
                </div>
              </h4>
              <!--子级分类-->
              <ul v-if="firstItem.children">
                <li
                  v-for="childrenItem in firstItem.children"
                  :key="childrenItem.id"
                >
                  132
                  <div class="button-group">
                    <el-button
                      size="mini"
                      type="danger"
                      round
                    >编辑</el-button>
                    <el-button
                      size="mini"
                      round
                    >删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form
            label-width="142px"
            class="from-wrap"
            ref="categoryForm"
          >
            <el-form-item
              label="一级分类名称："
              prop=""
              v-if="category_first_input"
            >
              <el-input
                v-model="form.categoryName"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二级分类名称："
              prop=""
              v-if="category_children_input"
            >
              <el-input
                v-model="form.secCategoryName"
                :disabled="category_children_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :disabled="submit_button_disabled"
                :loading="submit_button_loading"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  AddFristCategory,
  AddChildrenCategory,
  GetCategory
} from "../../api/news";
export default {
  name: "infoCategory",
  data() {
    return {
      // 输入框的value
      form: {
        categoryName: "",
        secCategoryName: ""
      },
      // 左侧分级的value
      category: {
        item: [],
        current: []
      },
      // loading
      submit_button_loading: false,
      // 控制输入框
      category_first_input: true,
      category_children_input: true,
      // 禁用输入框和按钮
      category_first_disabled: true,
      category_children_disabled: true,
      submit_button_disabled: true,
    };
  },

  mounted() {
    this.getCategory();
  },
  methods: {
    // 添加一级分类
    addFirst() {
      this.category_first_input = true;
      this.category_children_input = false;
      // 禁用重置
      this.category_first_disabled = false;
     this.submit_button_disabled = false;
    },
    // 添加分类请求数据获取
    getCategory() {
      GetCategory()
        .then(response => {
          console.log(response);
          let data = response.data.data.data;
          this.category.item = data;
          console.log(this.category, item);
        })
        .catch(error => {});
    },
    editCategory() {},
    handlerAddChildren() {},
    deleteCategoryComfirm() {},
    // 提交添加
    submit() {
      if (!this.form.categoryName) {
        this.$message({
          message: "输入不能为空！",
          type: "error"
        });
        return false;
      }
      // 按钮loading
      this.submit_button_loading = true;
      // 请求数据
      AddFristCategory({ categoryName: this.form.categoryName })
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.category.item.push(response.data.data);
            // this.getCategory();
          }
          console.log(data);
          // 请求成功后重置按钮loading
          this.submit_button_loading = false;
          this.form.categoryName = "";
          this.form.secCategoryName = "";
        })
        .catch(error => {
          this.submit_button_loading = false;
          this.form.categoryName = "";
          this.form.secCategoryName = "";
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/config";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>