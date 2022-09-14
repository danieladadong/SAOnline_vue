<template>
  <div>
      <shead></shead>
    <el-container style="height: 100%; border: 1px solid #eee;margin-top:70px;">
      <el-aside width="210px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          style="height:480px;"
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item
            index="1"           
            @click="MyCourse()">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的课程</span>
          </el-menu-item>
          <el-menu-item
            index="2"            
            @click="Schedule()">
            <i class="el-icon-s-home"></i>
            <span slot="title">我的课表</span>
          </el-menu-item>
          <el-menu-item index="3" 
            @click="myExam()">
            <i class="el-icon-message-solid"></i>
            <span slot="title">我的测试</span>
          </el-menu-item>
          <el-menu-item index="4" 
            @click="myRecord()">
            <i class="el-icon-message-solid"></i>
            <span slot="title">测试成绩</span>
          </el-menu-item>
          <el-menu-item
            index="5"            
            @click="myprofile()">
            <i class="el-icon-location"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style lang="scss" scoped>
.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.item {
  margin-top: 10px;
  margin-right: -90%;
}
</style>

<script>
import cookie from "js-cookie";
import Shead from '../../views/common/Shead.vue';
export default {
  data() {
    return {
      chatVisable:false,
    };
  },
  components:{
    "shead":Shead,
  },
  created() {
    var type = cookie.get("type")
    if(type=="admin"){
      this.isamdin = true;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    MyCourse(){
        this.$router.push({name:'mycourse'})
    },
    Schedule(){
        this.$router.push({name:'schedule'})
    },
    myExam(){
        this.$router.push({name:'myexam'})
    },
    myRecord(){
        this.$router.push({name:'myrecord'})
    },
    myprofile(){
      this.$router.push({name:'myprofile'})
    }
  },
};
</script>