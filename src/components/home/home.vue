<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
                <img src='../../assets/logo.png' alt="无法显示图片" class='logo' />
                <h2 class="title" >电商后台管理系统</h2>
            </el-col>
            <el-col :span="18" >
                <div class="grid-content bg-purple-light">
                    
                </div>
            </el-col>
            <el-col :span="2" class="exit_btn">
                <div class="grid-content bg-purple">    
                    <el-button type="danger" round >退出</el-button>              
                </div>
                
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-main class="main">Main
            <div class="div"></div>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

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
    background-image:-webkit-linear-gradient(bottom,rgb(61, 54, 54),#fd8403,yellow); 
    background-clip: text;
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
.exit_btn,#an{
   float: right;
   display: flex;
   margin-top:10px;
   flex-direction: row-reverse;
  
  
}
</style>
