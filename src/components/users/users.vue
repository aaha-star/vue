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
                <el-input @clear="loadUserlist()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                    <el-button slot="append" icon="el-icon-search" @click.prevent='getUserList()'></el-button>
                </el-input>
                <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
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
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelUserMsgBox(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 4.分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5,10,15,20]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 5.对话框 -->
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" label-width="100">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="100">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话" label-width="100">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>

            <!--编辑用户对话框  -->
          <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="100">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话" label-width="100">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>


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
        pagesize:5,
        userlist:[],
        total:-1,
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        form:{
            username:'',
            password:'',
            email:'',
            mobile:'',
        }
    }
},
created(){
    this.getUserList()
},
methods:{
    //编辑用户 - 发送请求
    async editUser(){
        const res =await this.$http.put('users/'+this.form.id,this.form)
        // 关闭对话框
        this.dialogFormVisibleEdit = false
        // 更新视图
        this.getUserList()
    },
    //编辑用户 - 显示对话框
    showEditUserDia(user){
        this.form = user
        this.dialogFormVisibleEdit = true
    },
    //删除用户 - 打开消息盒子
    showDelUserMsgBox(userId){
          this.$confirm('删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const res = await this.$http.delete('users/'+userId)
          console.log(res)
          if(res.data.meta.status === 200){
            //更新视图
            this.pagenum = 1
            this.getUserList()
            //提示
            this.$message({
            type: 'success',
            message: res.data.meta.msg
          });
          } 
          })
         .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },

    //添加用户发送请求
    async addUser(){
        this.dialogFormVisibleAdd = false

        const res = await this.$http.post('users',this.form)
        console.log(res)
        const {
            meta: {status,msg},
            data
        } = res.data

        if(status === 201){
            //提示成功
            this.$message.success(msg)
            //更新视图
            this.getUserList()

            this.form = {}
            // for(const key in this.form){
            //     if(this.form.hasOwnProperty(key)){
            //         this.form[key] = ""
            //     }
            // }

        } else{
            this.$message.warning(msg)
        }
    },

    //添加用户
    showAddUserDia(){
        this.form = {}
        this.dialogFormVisibleAdd = true; 
    },

    //清空搜索框时触发，加载所有用户列表
    loadUserlist(){
        this.getUserList()
    },

    //分页功能
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.getUserList()
      },
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
