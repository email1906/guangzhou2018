// 导入组件
import Login from '../component/login/Login.vue';
import Admin from '../component/admin/Admin.vue';
// 该文件对外导出路由配置
export default {
  routes: [
    // 登录
    { name: 'login', path: '/login', component: Login },
    // 后台管理
    { name: 'admin', path: '/admin', component: Admin },
  ]
}