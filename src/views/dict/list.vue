<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start">
        <el-button type="text" @click="exportData"
          ><i class="fa fa-plus" /> 导出</el-button
        >
      </div>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildren"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="200"> </el-table-column>
      <el-table-column prop="dictCode" label="编码" width="150">
      </el-table-column>
      <el-table-column prop="value" label="值" width="150"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dict from "@/api/dict";
export default {
  data() {
    return {
      list: [], //数据字典列表数组
    };
  },
  created() {
    this.getDictList(1);
    this.$message({
      type: "success",
      message: "修改医院设置成功!",
    });
  },
  methods: {
    getDictList(id) {
      dict.getDictList(id).then((response) => {
        this.list = response.data;
      });
    },
    getChildren(tree, treeNode, resolve) {
      //查询下面层级内容
      console.log(tree);
      dict.getDictList(tree.id).then((response) => {
        resolve(response.data);
      });
    },
    //导出数据字典
    exportData(){
        //直接调用导出接口
        window.location.href="http://localhost:8202/admin/cmn/dict/exportData"
    }
  }
};
</script>