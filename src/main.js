// 导入默认初始化样式
import 'normalize.css';
// 导入自己写的全局样式
import './less/index.less';

// 1.1 导入第三方包
import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 1.2 启动vue插件
Vue.use(VueRouter);
Vue.use(ElementUI);

// 2.1 导入自己写的东西
import App from "./component/App.vue";

// 2.2 导入路由配置
import routerConfig from "./router/index.js";

// 3 导入axios,因为它不是vue插件,使用起来不方便,所以我们手动把它添加到原型中,方便使用
import axios from 'axios';
axios.defaults.baseURL = "http://157.122.54.189:9095";// 一配置以后所有的请求就会自动使用这个域名
axios.defaults.withCredentials=true;// 浏览器有个安全机制,如果是跨域请求,浏览器是不会把本地cookie信息携带过去的
Vue.prototype.$http = axios;

// 4 导入api配置对象,为了使用更加方便,也把它导入到原型中
import api from "./js/api-config.js";
Vue.prototype.$api = api;

// 5 路由实例
import beforeEach from './router/beforeEach.js' //使用一个文件编写路由守卫
let vueRouter = new VueRouter(routerConfig);    //创建路由实例
vueRouter.beforeEach(beforeEach);               //注册守卫

// 把根组件渲染到指定视图
new Vue({
    el: '#app',
    render: createElement => {
        return createElement(App);
    },
    router: vueRouter
});