<template>
  <div class='login'>
    <h1>后台管理</h1>
    <!-- model用来关联表单数据,rules用来指定校验规则 -->
    <el-form label-position="left" label-width="80px" :rules="rules" ref="ruleForm2" :model="formLabelAlign">
      <!-- 如果要表单校验与重置功能,必须加上prop属性 -->
      <el-form-item label="账号:" prop="uname">
        <el-input v-model="formLabelAlign.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="upwd">
        <el-input v-model="formLabelAlign.upwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    function unameFn(rule, value, callback) {
      if (value == "") {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    }
    function upwdFn(rule, value, callback) {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    }
    return {
      // 表单提交的数据
      formLabelAlign: {
        uname: "",
        upwd: ""
      },
      // 表单校验规则
      rules: {
        uname: [{ validator: unameFn, trigger: "blur" }],
        upwd: [{ validator: upwdFn, trigger: "blur" }]
      }
    };
  },

  // 组件初始化完毕,自动调用
  created() {
    // 测试
    this.$http.get(this.$api.islogin).then(res => {
      console.log(res.data);
    });
  },

  methods: {
    // 登录
    login() {
      this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
        if (res.data.status == 0) {
          this.$alert("登录成功,马上跳转到首页");
        }else{
          this.$alert(res.data.message);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert("请重新输入!");
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  top: 40%;
  transform: translateY(-50%);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}
h1 {
  width: 100%;
  text-align: center;
  position: absolute;
  top: -60px;
  left: 0;
  margin: 0;
  color: #fff;
}
</style>