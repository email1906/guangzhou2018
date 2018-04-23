// 因为当前不是vue组件,所以无法this.$http和this.$api拿取东西,只能单独导入使用
import axios from 'axios';
import api from '../js/api-config.js';

// 1.先获取用户要去的页面
// 2.如果用户要去登录页
// 2.1 那么判断用户是不是登录过了,是的话直接给他跳转到后台首页
// 3.如果用户要去后台管理相关页
// 3.1 那么判断用户是不是登录过了,不是的话给它跳转登录页
export default (to, from, next) => {
  var toPageName = to.name;
  // 请求接口判断用户有没有登录
  axios.get(api.isLogin).then(res => {
    let isLogin = false;
    if (res.data.code == 'logined') {
      isLogin = true;
    }
    // 用户访问登录页面,如果已登录,那么自动跳转到首页
    if (toPageName == 'login' && isLogin) {
      next('/admin');
    }
    // 访问后台管理页面,但是用户未登录,那么自动跳转登录页
    // 跳转到登录时,把当前页面通过url参数记录下来
    else if (toPageName != 'login' && !isLogin) {
      next({ name: 'login', query: { nextPage: to.fullPath } });
    } else {
      next();
    }
  });
}