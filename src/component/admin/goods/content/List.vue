<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>购物商场</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 按钮组 -->
    <div>
      <el-button size="mini" plain icon="el-icon-plus">新增</el-button>
      <el-button size="mini" plain icon="el-icon-check" @click="selectAll">全选</el-button>
      <el-button size="mini" plain icon="el-icon-delete" @click="selectDel">删除</el-button>
      <el-input style="width:200px; float:right;" size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="gsListQuery.searchvalue" @blur="getGoodsList"></el-input>
    </div>

    <!-- 表格 -->
    <!-- el-table组件必须设置data属性,传入一个数组,然后表格会自动遍历这个数组进行渲染 -->
    <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData3" @selection-change="selectionChange">

      <!-- 多选框 -->
      <!-- type用来指定当前列的类型,不指定的就是普通文本类型,这里指定为selection含义是多选框类型 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- 标题 -->
      <!-- 没有type类型就是普通类型,普通类型可以通过label设置表头 -->
      <!-- 普通类型还通过内嵌template标签,书写当前列展示的数据 -->
      <el-table-column label="标题">
        <!-- scope.row是固定写法,title是活的,展示什么字段,就写什么 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="right">
            <!-- titip的提示信息,这个标签必须加一个slot属性 -->
            <div slot="content">
              <img style="width: 200px" :src="scope.row.imgurl" alt="商品预览">
            </div>
            <!-- 被提示的原标签 -->
            <router-link :to="{ name: 'goodsCtEdit', params: { id: scope.row.id} }"> {{ scope.row.title }} </router-link>
          </el-tooltip>
        </template>
      </el-table-column>

      <!-- 所属类别 -->
      <!-- 没有type类型就是普通类型,普通类型可以通过label设置表头 -->
      <!-- 普通类型还可以通过prop属性指定当前列展示的数据字段,比template方便 -->
      <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>

      <!-- 库存 -->
      <el-table-column prop="stock_quantity" label="库存" width="120"></el-table-column>

      <!-- 市场价 -->
      <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>

      <!-- 销售价 -->
      <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>

      <!-- 状态 -->
      <!-- 显示的数据是三个icon图标,只能用template包裹实现 -->
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <!-- 字体图标,默认为浅灰色,如果添加active类,name就是亮黑色 -->
          <!-- class可以写活,值可以为一个数组,里面可以加表达式运算 -->
          <!-- 监听点击事件,需要把当前商品的id,修改的字段,以及该字段新的状态(布尔值)传过去 -->
          <i :class="['el-icon-picture', scope.row.is_slide == 1? 'active': '']" @click="modifyStatus(scope.row.id, 'is_slide',scope.row.is_slide == 1? false: true)"></i>
          <i :class="['el-icon-upload2', scope.row.is_top == 1? 'active': '']" @click="modifyStatus(scope.row.id, 'is_top',scope.row.is_top == 1? false: true)"></i>
          <i :class="['el-icon-star-on', scope.row.is_hot == 1? 'active': '']" @click="modifyStatus(scope.row.id, 'is_hot',scope.row.is_hot == 1? false: true)"></i>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <!-- 显示的数据是死的,固定为'修改',用template包裹实现,同时需要router-link标签,为了实现点击跳转 -->
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="{ name: 'goodsCtEdit', params: {id: scope.row.id} }">修改</router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- @size-change用来监听每页数量变化时的事件 -->
    <!-- @current-change用来监听页码变化时的事件 -->
    <!-- current-page用来指定当前页,page-sizes用来指定数量的下拉菜单 -->
    <!-- page-size用来指定当前每页的数量,total用来指定总数量 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="gsListQuery.pageIndex" :page-sizes="page.pageSizes" :page-size="gsListQuery.pageSize" :total="page.total" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 表格数据,将来从接口里面拿
            tableData3: [
                {
                    id: 103,
                    title:
                        "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
                    is_top: 1,
                    is_hot: 1,
                    is_slide: 1,
                    categoryname: "男装",
                    img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    imgurl:
                        "http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    goods_no: "NZ0000000002",
                    stock_quantity: 200,
                    market_price: 1000,
                    sell_price: 800
                }
            ],
            // 请求接口所查询的字符串
            gsListQuery: {
                pageIndex: 1,
                pageSize: 5,
                searchvalue: ""
            },
            // 分页相关数据
            page: {
                pageSizes: [5, 10, 15, 20],
                total: 100
            },
            // 存储被勾选的数据
            selection: []
        };
    },
    methods: {
        // 获取商品列表数据
        getGoodsList() {
            // get方法的第二个参数是一个对象,对象可以设置headers请求头,还可以设置params查询字符串
            this.$http
                .get(this.$api.gsList, { params: this.gsListQuery })
                .then(res => {
                    this.tableData3 = res.data.message;
                    this.page.total = res.data.totalcount;
                    // 接口还会返回如下三条数据,将来分页使用到
                    // res.data.totalcount
                    // res.data.pageIndex
                    // res.data.pageSize
                });
        },
        // 修改商品状态
        modifyStatus(id, type, newStatus) {
            // post方法的第二个参数是要提交的数据,第三个参数是一个配置对象
            // 注意:下面的数据使用的是es6语法,含义:{ [引用变量]: 引用变量 }
            // this.$http.post(this.$api.gsEdit + id, {[type]:newStatus}).then(res =>{
            //   this.$alert(res.data.message);
            // });

            this.tableData3.filter(goods => goods.id == id)[0][type] = newStatus
                ? 1
                : 0;
        },
        // 每页数量变化时,拿到新的值,修改数据,需要重新请求接口渲染列表
        sizeChange(pageSize) {
            this.gsListQuery.pageSize = pageSize;
            this.getGoodsList();
        },
        // 每页数量变化时,拿到新的值,修改数据,需要重新请求接口渲染列表
        currentChange(pageIndex) {
            this.gsListQuery.pageIndex = pageIndex;
            this.getGoodsList();
        },
        // 删除
        // 1 从selection数据中提取所有的id,组成ids字符串
        // 2 然后调用接口删除,删除成功后再请求新的列表数据进行渲染
        // 3 删除成功后,清空被选数据
        del() {
            let ids = this.selection.map(v => v.id).join(",");
            this.$http.get(this.$api.gsDel + ids).then(res => {
                if (res.data.status == 0) {
                    this.getGoodsList();
                    this.selection = [];
                }
            });
        },
        // 删除按钮
        selectDel() {
            this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.del();
                    // 成功删除后给出提示
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 全选按钮
        selectAll() {
            document.querySelector(".el-checkbox__inner").click();
        },
        // 监听表格多选框的变化
        // 1 该事件回调会接收到那些被勾选的数据
        // 2 我们这里把这些数据保存起来, 将来在删除的时候使用
        selectionChange(selection) {
            this.selection = selection;
        }
    },
    // 组件初始化完毕后,立马调用接口进行渲染
    created() {
        this.getGoodsList();
    }
};
</script>

<style scoped lang="less">
// 属性选择器,给class前缀为el-icon的标签设置颜色
[class^="el-icon"] {
    color: rgba(0, 0, 0, 0.3);
    &.active {
        color: #000;
    }
}
</style>