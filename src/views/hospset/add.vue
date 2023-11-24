<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称" width="100px">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号" width="100px">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api地址" width="100px">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人" width="100px">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="电话" width="100px">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospset from "@/api/hospset"; //引入接口定义的文件
export default {
    data() {
    return {
      hospitalSet: {}
    };
  },
  created() {
    
  },
  methods: {
      saveOrUpdate(){
          hospset.saveHospSet(this.hospitalSet).then(response=>{
              console.log(response)
              this.$message({
                type: "success",
                message: "添加医院设置成功!",
            });
            //跳转列表页面，使用路由跳转方式实现
            this.$router.push({path:'/hospSet/list'})
          })
      }
  }
}
</script>
