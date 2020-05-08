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
              v-model="category"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in categoryValue.item"
                :key="item.id"
                :label='item.category_name'
                :value="item.id"
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
              v-model="categoryId"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                label="Id"
                value=" "
              ></el-option>
              <el-option
                label="id2"
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
      :data="tableData.item"
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <dialogInfo
      :flag="dialog_Info"
      @close="closeDialog"
      :category="categoryValue.item"
    ></dialogInfo>

  </div>
</template>
<script>
import dialogInfo from "./dialog/info";
import { GetList } from "../../api/news";
export default {
  name: "infoIndex",
  components: { dialogInfo },
  data() {
    return {
      // 分类
      category: "",
      // 关键字
      categoryId: "",
      // 分类的数据
      categoryValue: { item: [] },
      // 日期
      dataValue: "123",
      // 控制弹窗显示
      dialog_Info: false,
      // 列表数据
      tableData: { item: [] },
      // 页码总数
      total: 0,
      // 页码
      page: { pageNumber: 1, pageSize: 5 }
    };
  },
  mounted() {
    // 获取分类
    this.getInfoCategory();
    // 获取列表
    this.getInfoList();
  },
  watch: {},

  methods: {
    // 获取分类发送请求
    getInfoCategory() {
      this.$store
        .dispatch("common/getInfoCategory")
        .then(response => {
          let data = response.data.data.data;
          this.categoryValue.item = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取信息列表发送请求
    getInfoList() {
      let requestData = {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      GetList(requestData)
        .then(response => {
          let data = response.data.data;
          // console.log(data)
          this.tableData.item = data.data;
          this.total = data.total;
        })
        .catch(error => {
          console.log(error);
        });
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
    confirmDelete() {
      console.log("删除所选文件");
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
    // 页码
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getInfoList();
      console.log(val);
    },
    // 点击的页码
    handleCurrentChange(val) {
      this.page.pageNumber = val;
      // 更改页面---获取对应页码的数据
      this.getInfoList();
      console.log(val);
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
