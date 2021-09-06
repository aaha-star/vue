<!--
<template>
</template>

<script>
    export default {

    }
</script>

<style>

</style>
-->
<template>
    <el-card>
        <!-- 1.面包屑
        首页/用户管理/用户列表 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 2.搜索 -->
        <el-row class="searchRow">
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                    <el-button slot="append" icon="el-icon-search" @click.prevent='getUserList()'></el-button>
                </el-input>
                <el-button type="success">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 3.表格 -->
        <el-table :data="userlist" style="width: 100%">
            <el-table-column type="index" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>

            <el-table-column label="创建时间">
                <template slot-scope="userlist">
                    {{userlist.row.create_time | fmtdate}}
                </template>
            </el-table-column>

            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.msg_state" active-color="#13ce66" inactive-color='#ff4949'></el-switch>
                </template>

            </el-table-column>
            <el-table-column prop="address" label="用户操作">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 4.分页 -->

    </el-card>
</template>

<script>
export default {
data(){
    // create_time: 1486720211
// email: "adsfad@qq.com"
// id: 500
// mg_state: true
// mobile: "12345678"
// role_name: "超级管理员"
// username: "admin"
    return {
        query:'',
        pagenum:1,
        pagesize:2,
        userlist:[],
        total:-1,

        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }]
    }
},
created(){
    this.getUserList()
},
methods:{
    // 获取用户列表的请求
    async getUserList(){
        const AUTH_TOKEN = localStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const res=await this.$http.get('users?query='+this.query+'&pagenum='+this.pagenum+'&pagesize='+this.pagesize
        )
        console.log(res.data)
        const{
            meta: {status,msg},
            data: {users,total}
        } = res.data
        if(status === 200){
            // 1.给表格数据赋值
            this.userlist=users
            // 2.给total赋值
            this.total = total
            //3.提示
            this.$message.success(msg)
        }else{
            //提示
            this.$message.warning(msg)
        }
    }
}
}
</script>

<style >
.box-card{
    height: 100%;
}
.inputSearch{
    width:300px;
}
.searchRow{
    margin-top: 20px;
}
</style>
