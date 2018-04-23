<template>
  <el-dropdown class="header">
    <span class="el-dropdown-link">
      <span>你好,{{name}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>修改密码</el-dropdown-item>
      <!-- 默认情况下,监听组件的事件都是监听组件自己emit发生的事件 -->
      <!-- 如果要监听浏览器原生事件,添加一个native修饰符即可 -->
      <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      name: "admin"
    };
  },
  methods: {
    logout() {
      this.$http.get(this.$api.logout).then(res => {
        if (res.data.status === 0) {
          this.$router.push({ name: "login" });
        } else {
          this.$alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  text-align: right;
  display: block;
  line-height: 60px;
}
</style>