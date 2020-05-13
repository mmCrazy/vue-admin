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
      <el-col :span="9">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%;"
              v-model="dateValue"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select
              v-model="search_key"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in search_option"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>

            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          placeholder="请输入内容"
          style="width: 100%;"
          v-model="search_keyWork"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          style="width: 100%;"
          @click="search"
        >搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          class="pull-right"
          style="width: 100%;"
          @click="newInfo"
        >新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      v-loading="dataLoading"
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
        :formatter="toCategory"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="170"
        :formatter="toData"
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
            @click="editInfo(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="deleteItem(scope.row.id)"
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
          :page-size=5
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "userIndex",
  data() {
    return {
      // 分类
      category: "",
      // 关键字
      categoryId: "",
      // 分类的数据
      categoryValue: { item: [] },
      // 日期
      dateValue: "",
      // 搜索关键字
      search_key: "",
      search_option: [
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ],
      // 搜索内容
      search_keyWork: "",
      // 控制弹窗显示
      dialog_Info: false,
      // 列表数据
      tableData: { item: [] },
      // 页码总数
      total: 0,
      // 页码
      page: { pageNumber: 1, pageSize: 5 },
      // 数据列表loading
      dataLoading: false,
      //记录删除得id
      deleteInfoId: "",
      // 记录是新增还是修改
      DataInfo: {
        value: "",
        info: {}
      }
    };
  },
  methods: {
    toData(){},
    search(){},
    newInfo(){},
    editInfo(){},
    toCategory(){},
    deleteItem(id){},
    deleteAll(){},
    handleSelectionChange(){},
    handleSizeChange(){},
    handleCurrentChange(){}
  },
};
</script>
<style lang="scss" scoped>
@import ".././../style/config";
.label-wrap {
  &.category {
    @include labelDom(left, 50, 40);
  }
  &.date {
    @include labelDom(right, 90, 40);
  }
  &.key-work {
    @include labelDom(right, 60, 40);
  }
}
</style>
