<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
                <img src='../../assets/logo.png' alt="无法显示图片" class='logo' />
                <h2 class="title">电商后台管理系统</h2>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-light">

                </div>
            </el-col>
            <el-col :span="2" class="exit_btn">
                <div class="grid-content bg-purple">
                    <el-button type="danger" round @click.prevent='handleSignout()'>退出</el-button>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">
            <el-menu
            :router='true'
            :unique-opened="true"
            >
                <!-- //1 -->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="users">
                            <i class="el-icon-menu"></i>
                            <span>用户列表</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- //2 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-promotion"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item>
                            <i class="el-icon-menu"></i>
                            <span>角色列表</span>
                        </el-menu-item>
                        <el-menu-item>
                            <i class="el-icon-menu"></i>
                            <span>权限列表</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 3 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-goods"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item>
                           <i class="el-icon-menu"></i>
                            <span>商品列表</span>
                        </el-menu-item>
                        <el-menu-item>
                           <i class="el-icon-menu"></i>
                            <span>分类参数</span>
                        </el-menu-item>
                        <el-menu-item>
                           <i class="el-icon-menu"></i>
                            <span>商品分类</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!-- 4 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-s-claim"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item>
                             <i class="el-icon-menu"></i>
                            <span>商品分类</span>
                        </el-menu-item>
                       
                    </el-menu-item-group>
                </el-submenu>

                <!-- 5 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item>
                            <i class="el-icon-menu"></i>
                            <span>数据报表</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view> 
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
// 页面加载前验证是否有token，有的话加载页面，没有返回login页面
beforeCreate(){
    const token = localStorage.getItem('token')
    if(!token){
        this.$message.warning('请先登录')
        this.$router.push({name:'login'})
    }
},

methods:{
    handleSignout(){
        //1.清除token
        localStorage.clear()
        //2.提示退出成功
        this.$message.success('退出成功')
        //3.来到login组件
        this.$router.push({name:'login'})
    }
}


}
</script>

<style>
.container {
    height: 100%;
}

.header {
    padding: 0;
    background-color: #b3c0de;
}

.asider {
    background-color: rgba(62, 31, 236, 0.667);
}

.main {
    background-color: #e9eef3;
}

.div {
    width: 0;
    border-top: 0px solid transparent;
    border-left: 50px solid transparent;

    border-right: 50px solid transparent;

    border-bottom: 100px solid black;
}

.logo {

    padding: 0;
    height: 60px;
    float: left;
    margin-left: 0;
}

.title {

    padding: 0;
    background-image: -webkit-linear-gradient(bottom, rgb(61, 54, 54), #fd8403, yellow);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.exit_btn,
#an {
    float: right;
    display: flex;
    margin-top: 10px;
    flex-direction: row-reverse;

}
</style>
