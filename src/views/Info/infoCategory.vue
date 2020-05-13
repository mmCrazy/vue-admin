<template>
  <div id="category">
    <el-button
      type="danger"
      @click="addFirst({type:'category_first_add'})"
    >添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="10">
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
                    @click="editCategory({data:firstItem,type:'category_first_edit'})"
                    round
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    round
                    @click="handlerAddChildren({data:firstItem,type:'category_children_add'})"
                  >添加子级</el-button>
                  <el-button
                    size="mini"
                    round
                    @click="deleteCategoryComfirm(firstItem.id)"
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
                      @click="deleteCategoryComfirm(childrenItem.id)"
                    >删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
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
  GetCategory,
  DeleteCategory,
  EditCategory
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
      // 记录删除的id
      deleteId: "",
      // 记录打开是哪个级
      subit_button_type: ""
    };
  },

  mounted() {
    this.getCategory();
  },
  methods: {
    // 添加一级分类
    addFirst(params) {
      // 清空输入框
      this.form.categoryName = "";
      // 记录为一级分类
      this.subit_button_type = params.type;
      console.log(this.subit_button_type);
      // 一级输入框和子级输入框的显示与隐藏
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
          // console.log(response);
          let data = response.data.data;
          this.category.item = data;
          // console.log(this.category.item);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 提交添加
    submit() {
      if (this.subit_button_type == "category_first_add") {
        this.addFirstCategory();
      }
      if (this.subit_button_type == "category_first_edit") {
        this.editFirstCategory();
      }
      if (this.subit_button_type == "category_children_add") {
        this.addChildrenCategory();
      }
    },
    // 添加一级分类请求和添加
    addFirstCategory() {
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
    },

    // 修改编辑按钮的触发
    editCategory(params) {
      // 隐藏子级输入框
      this.category_children_input = false;
      this.category_first_disabled = false;
      this.submit_button_disabled = false;
      // console.log(params);
      // 记录分类得级别
      this.subit_button_type = params.type;
      console.log(this.subit_button_type);
      // 编辑同步输入框的value
      this.form.categoryName = params.data.category_name;
      // 储存当前数据对象
      this.category.current = params.data;
    },
    // 编辑状态的请求和提交
    editFirstCategory() {
      if (this.category.current.length == 0) {
        this.$message({
          message: "未选择分类！！",
          type: "error"
        });
        return false;
      }
      let requestData = {
        id: this.category.current.id,
        categoryName: this.form.categoryName
      };
      EditCategory(requestData).then(response => {
        let responseData = response.data;
        this.$message({
          message: responseData.message,
          type: "success"
        });
        this.category.current.category_name =
          responseData.data.data.categoryName;
        // 清空输入框
        this.form.categoryName = "";
        this.category.current = [];
      });
    },
    // 添加二级分类
    handlerAddChildren(params) {
      // console.log(params.type);
      // 一级输入框和子级输入框的显示与隐藏
      this.category_first_input = true;
      this.category_children_input = true;
      // 禁用重置
      this.category_first_disabled = true;
      this.category_children_disabled = false;
      this.submit_button_disabled = false;
      // 修改一级分类的名字
      this.form.categoryName = params.data.category_name;
      // 储存当前数据对象
      this.category.current = params.data;
      // 修改提交类型

      this.subit_button_type = params.type;
    },
    // 二级分类---发送请求数据
    addChildrenCategory() {
      if (!this.form.secCategoryName) {
        this.$message({
          message: "子级输入不能为空！",
          type: "error"
        });
        console.log(this.form.secCategoryName);
        return false;
      }
      // console.log(this.category.current.id);
      let requestData = {
        categoryName: this.form.secCategoryName,
        parentId: this.category.current.id
      };
      AddChildrenCategory(requestData)
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
          // 刷新分类列表
          this.getCategory();
          // 清空子级输入框
          this.form.secCategoryName = "";
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除分类
    deleteCategoryComfirm(categoryId) {
      this.deleteId = categoryId;
      this.myComfirm({
        content: "永久删除所选文件,是否继续",
        tip: "提示",
        fn: this.deleteCategory,
        catchFn: () => {
          this.deleteId = "";
          console.log("去掉deleteId的值");
        }
      });
    },
    // 删除分类的弹窗回调
    deleteCategory() {
      DeleteCategory({ categoryId: this.deleteId })
        .then(response => {
          let index = this.category.item.findIndex(
            item => item.id == this.deleteId
          );
          // 使用filter过滤的方法 过滤掉与目标值不相等的值,返回一个数组,目标值被除掉了
          // let index = this.categoty.item.filter(item=>item.id !== this.deleteId)
          // this.category.item = index
          this.category.item.splice(index, 1);
          this.getCategory();
          // console.log(response);
        })
        .catch(error => {
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