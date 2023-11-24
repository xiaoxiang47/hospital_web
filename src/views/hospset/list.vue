
<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--批量删除按钮-->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称" width="180" />
      <el-table-column prop="hoscode" label="医院编号" width="160" />
      <el-table-column prop="apiUrl" label="地址" width="200" />
      <el-table-column prop="contactsName" label="联系人" />
      <el-table-column prop="contactsPhone" label="联系方式" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <!-- {{ scope.row.status === 1 ? "可用" : "不可用" }} -->
          <el-switch
            v-model="scope.row.status"
            active-color="#F04134"
            active-text="锁定"
            :active-value="0"
            inactive-color="#00A854"
            inactive-text="取消锁定"
            :inactive-value="1"
            @change="lockHospSet(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/hospSet/add/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link> -->
          <el-button @click="openupdateHosp(scope.row),dialogFormVisible = true" type="success"
            size="mini"
            icon="el-icon-delete"
            >修改</el-button
          >
          <el-dialog title="修改医院设置信息" :visible.sync="dialogFormVisible" @close="closeUpdate">
            <el-form>
              <el-form-item label="医院名称" :label-width="width">
                <el-input v-model="hospSet.hosname"></el-input>
              </el-form-item>
              <el-form-item label="医院编号" :label-width="width">
                  <el-input v-model="hospSet.hoscode"></el-input>
              </el-form-item>
              <el-form-item label="api地址" :label-width="width">
                <el-input v-model="hospSet.apiUrl"></el-input>
              </el-form-item>
              <el-form-item label="联系人" :label-width="width">
                  <el-input v-model="hospSet.contactsName"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="width">
                  <el-input v-model="hospSet.contactsPhone"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false, hospSet = {}">取 消</el-button>
              <el-button type="primary" @click="updateHosp()"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import hospset from "@/api/hospset"; //引入接口定义的文件
export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {},
      list: [], //每页数据集合
      total: 0, //总记录数
      width: 120,
      multipleSelection: [], //批量选择的信息
      dialogFormVisible: false,
      hospSet: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
      updateHosp(){
          hospset.updateHospSet(this.hospSet).then(response=>{
              console.log(response)
            //跳转列表页面，使用路由跳转方式实现
            this.dialogFormVisible = false, 
            this.hospSet = {}
            this.$router.push({path:'/hospSet/list'})
            this.$message({
                type: "success",
                message: "修改医院设置成功!",
            })
          })
          
      },
      openupdateHosp(row){
          console.log(row)
          this.hospSet = row;
      },
      closeUpdate(){
          this.hospSet = {}
      },
    lockHospSet(row) {
      console.log(row);

      if (row.status == 1) {
        hospset.lockHospSet(row.id, 1);
        this.$message({
          type: "success",
          message: "取消锁定成功!",
        });
      }
      if (row.status == 0) {
        hospset.lockHospSet(row.id, 0);
        this.$message({
          type: "info",
          message: "锁定成功!",
        });
      }
    },

    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    //批量删除
    removeRows() {
      this.$confirm("此操作将永久删除医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var idList = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var id = this.multipleSelection[i].id;
            idList.push(id);
          }
          return hospset.removeRows(idList);
        })
        .then(() => {
          this.getList(1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },

    //医院设置列表方法
    getList(page = 1) {
      this.current = page;

      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          //response接口返回的数据
          //把返回集合赋值给list
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
          console.log(response);
        }) //请求成功后调用
        .catch((error) => {
          console.log(error);
        }); //请求失败后调用
    },
    resetData() {
      this.searchObj = {};
      this.getList();
    },
    removeDataById(id) {
      // debugger
      // console.log(memberId)
      this.$confirm("此操作将永久删除该医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return hospset.removeById(id);
        })
        .then(() => {
          this.getList(1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
  },
};
</script>
