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
        width="250"
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
          <el-button
            size="mini"
            type="primary"
            plain
            @click="detailed(scope.row)"
          >编辑详情</el-button>
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
    <!-- 弹窗 -->
    <dialogInfo
      :flag="dialog_Info"
      :DataInfo.sync="DataInfo"
      @close="closeDialog"
      :category="categoryValue.item"
      @getList="getInfoList"
    ></dialogInfo>

  </div>
</template>
<script>
import dialogInfo from "./dialog/info";
import { GetList, DeleteInfo } from "../../api/news";
import { timestampToTime } from "../../utils/common";
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
  mounted() {
    // 获取分类
    this.getInfoCategory();
    // 获取列表
    this.getInfoList();
  },
  watch: {},

  methods: {
    // 新增
    newInfo() {
      this.dialog_Info = true;
      this.DataInfo.value = "新增";
    },
    // 编辑详情
    detailed(data) {
      // 预先存值
      this.$store.commit("infoDetailed/UPDATE_STATE_VALUE", {
        id:{
          value:data.id,
          sessionKey:"infoId",
          session:true
        },
        title:{
          value:data.title,
          sessionKey:"infoTitle",
          session:true
        }
      });
      // 路由跳转
      this.$router.push({
        name:"EditInfoDetailed",
        params:{
          id:data.id,
          title:data.title
        }
      })
    },
    // 编辑
    editInfo(row) {
      this.dialog_Info = true;
      this.DataInfo.value = "修改";
      this.DataInfo.info = row;
      // console.log(this.DataInfo.info)
    },
    // 类型的匹配
    toCategory(row) {
      // console.log(this.categoryValue.item);
      let categoryId = row.categoryId;
      let category = this.categoryValue.item.filter(
        item => item.id == categoryId
      )[0];
      // console.log(category);
      return category.category_name;
    },
    search() {
      let requestData = this.formatData();
      this.getInfoList();
    },
    // 时间戳的转换
    toData(row, column, cellValue, index) {
      // console.log(row)
      return timestampToTime(row.createDate);
    },
    // 获取分类发送请求
    getInfoCategory() {
      this.$store
        .dispatch("common/getInfoCategory")
        .then(response => {
          let data = response.data.data;
          this.categoryValue.item = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜索数据处理
    formatData() {
      let requestData = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      if (this.category) {
        requestData.categoryId = this.category;
      }
      if (this.dateValue) {
        requestData.startTiem = this.dateValue[0];
        requestData.endTime = this.dateValue[1];
      }
      if (this.search_keyWork) {
        requestData[this.search_key] = this.search_keyWork;
      }
      return requestData;
    },
    // 获取信息列表发送请求
    getInfoList() {
      this.dataLoading = true;
      let requestData = this.formatData();
      GetList(requestData)
        .then(response => {
          let data = response.data.data;
          // console.log(data)
          this.tableData.item = data.data;
          this.total = data.total;
          // 数据列表loading
          this.dataLoading = false;
        })
        .catch(error => {
          this.dataLoading = false;
          console.log(error);
        });
    },
    //弹窗
    closeDialog(flag) {
      this.dialog_Info = flag;
    },
    //删除对应项
    deleteItem(id) {
      // 删除得记录id
      this.deleteInfoId = [id];
      this.myComfirm({
        content: "永久删除该文件,是否继续",
        tip: "警告",
        fn: this.confirmDelete
      });
    },
    // 删除所有
    deleteAll() {
      if (this.deleteInfoId == "" || this.deleteInfoId.length == 0) {
        this.$message({
          message: "请选择要删除的数据!",
          type: "error"
        });
        return false;
      }
      this.myComfirm({
        content: "永久删除所选文件,是否继续",
        tip: "提示",
        fn: this.confirmDelete
      });
    },
    // 批量删除勾选回调
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let id = val.map(item => item.id);
      // console.log(id)
      this.deleteInfoId = id;
    },
    // 回调执行删除文件操作
    confirmDelete() {
      DeleteInfo({ id: this.deleteInfoId })
        .then(response => {
          this.deleteInfoId = "";
          this.getInfoList();
          console.log(response);
        })
        .catch(error => {});
      console.log("删除所选文件");
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
    }
  }
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
