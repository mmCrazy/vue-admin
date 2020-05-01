<template>
  <div>
    <el-row
      :gutter="14"
      style="margin-bottom:15px"
    >
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select
              v-model="formInline.region"
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
              v-model="value1"
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
              v-model="formInline.region"
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
          type="danger"
          style="width: 100%;"
        >搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          class="pull-right"
          style="width: 100%;"
          @click="dialogTableVisible = true"
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
        prop="date"
        label="日期"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button>批量删除</el-button>
    <el-pagination
      class="pull-right"
      background
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>

    <!-- 弹窗 -->
    <el-dialog
      title="收货地址"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body='false'
    >
        <el-table >
          123
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "infoIndex",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      value1: "123",
      dialogTableVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
