<template>
  <div id="category">
    <el-button
      type="danger"
      @click="addFirst()"
    >添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              
            >
              <!--一级分类-->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                123
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
              <ul v-if="true">
                <li
                 
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
            ref=""
          >
            <el-form-item
              label="一级分类名称："
              prop=""
              v-if="true"
            >
              <el-input
               
                :disabled="false"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二级分类名称："
              prop=""
              v-if="true"
            >
              <el-input
                
                :disabled="false"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_loading"
                :disabled="false"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "infoCategory",
  data() {
    return {};
  },
  methods: {
    addFirst(){},
    editCategory(){},
    handlerAddChildren(){},
    deleteCategoryComfirm(){},
    submit(){},

  },
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