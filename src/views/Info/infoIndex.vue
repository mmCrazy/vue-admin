<template>
  <div>
    <el-row
      :gutter="14"
      style="margin-bottom:15px"
    >
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="warp-content">
            <el-select
              v-model="categoryValue.region"
              placeholder="请选择"
              style="width: 100%;"
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
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%;"
              v-model="dataValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
              >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select
              v-model="categoryValue.region"
              placeholder="请选择"
              style="width: 100%;"
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
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入内容"
          style="width: 100%;"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          style="width: 100%;"
        >搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          class="pull-right"
          style="width: 100%;"
          @click="dialog_Info=true"
        >新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 20px"
    >

      <el-table-column
        type="selection"
        width="40"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width=""
      >
      </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="170"
      >
      </el-table-column>
      <el-table-column
        prop="user"
        label="管理员"
        width="115"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="dialog_Info=true"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button
          type="primary"
          plain
          @click="deleteAll"
        >批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          layout="prev, pager, next"
          :total="100"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <dialogInfo
      :flag="dialog_Info"
      @close="closeDialog"
    ></dialogInfo>

  </div>
</template>
<script>
import dialogInfo from "./dialog/info";
export default {
  name: "infoIndex",
  components: { dialogInfo },
  data() {
    return {
      categoryValue: {
        user: "",
        region: ""
      },
      dataValue: "123",
      dialog_Info: false,
      tableData: [
        {
          title: "海贼王",
          categoryId: "热血动漫",
          createDate: "2020-05-02",
          user: "路飞"
        },
        {
          title: "海贼王",
          categoryId: "热血动漫",
          createDate: "2020-05-02",
          user: "路飞"
        },
        {
          title: "海贼王",
          categoryId: "热血动漫",
          createDate: "2020-05-02",
          user: "路飞"
        },
        {
          title: "海贼王",
          categoryId: "热血动漫",
          createDate: "2020-05-02",
          user: "路飞"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    //弹窗
    closeDialog(flag) {
      this.dialog_Info = flag;
    },
    //删除对应项
    handleDelete(index, row) {
      this.myComfirm({
        content: "永久删除该文件,是否继续",
        tip: "警告",
        fn: this.confirmDelete
      });
      console.log(index, row);
    },
    // 删除所有
    deleteAll() {
      this.myComfirm({
        content: "永久删除所选文件,是否继续",
        tip: "提示",
        fn: this.confirmDelete
      });
    },
    // 回调执行删除文件操作
    confirmDelete(){
      console.log("删除所选文件")
    },

    
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import ".././../style/config";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 80, 40);
  }
}
</style>
