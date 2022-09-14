<template>
<div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
position: fixed;
top:0px;
width: 100%;
z-index:10">
  <el-menu mode="horizontal"
    :default-active="this.$router.path"
    style="padding-left:35%"
    background-color="#FFFFFF"
    text-color="#545c63"
    active-text-color="#ffd04b">
        <el-menu-item index="home" @click="toCourse('index')">
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="courses" @click="toCourse('courses')">
            <span>课程</span>
        </el-menu-item >
        <el-menu-item index="schools" @click="toCourse('schools')">
            <span>学校</span>
        </el-menu-item>
  </el-menu>
  <el-form
  :inline="true"
  @keyup.native.enter="search()"
  :model="dataForm">
  <el-input style="background-color: #f3f5f6;width:300px;" type="text" v-model="dataForm.name" placeholder="请输入要搜索的内容"/>
  <el-button type="primary" @click="search()">搜索</el-button>
  </el-form>
  <div class="avatar">
    <el-button v-if="!isLogin" type="primary" plain @click="login()">注册/登录</el-button>
    <el-dropdown v-if="isLogin" style="margin-top:10px">
        <i style="margin-right: 15px;color:#000;font-size: 19px;">{{profile.nick_name}}</i>
        <el-dropdown-menu slot="dropdown">
          <el-badge class="item" type="primary">
          <el-dropdown-item @click.native="chat()">消息</el-dropdown-item>
          </el-badge>
          <el-dropdown-item
            @click.native="myself()">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
    <chatdialog
      v-if="chatVisable"
       ref="chatdialog">
    </chatdialog>
</div>
</template>

<script>
import cookie from 'js-cookie'
import {getUserProfiles} from '@/api/users/Userprofile'
import {getUserDetail} from '@/api/users/User'
import {getCourse} from '@/api/course/Courses'
import chatdialog from '../operation/Chat.vue'
export default {
  data(){
    return{
      chatVisable:false,
      isLogin:false,
      profile:[],
      dataForm:{
        name:""
      },
      is_superuser:false,
      is_staff:false,
      searchData:null
    }
  },
  created(){
    this.isLogin = eval(cookie.get("isLogin"));
    if(this.isLogin){
      let params = {
        mobile:cookie.get("mobile"),
        page:1,
        size:1
      }
      getUserProfiles(params).then(resp=>{
        if(resp.length!=0){
          this.profile=resp[0]
          cookie.set("uuid",this.profile.id)
          cookie.set("nick_name",this.profile.nick_name)
        }
      });
      let id = cookie.get("uuid");
      getUserDetail(id).then(resp=>{
        if(resp.length!=0){
          this.is_superuser = resp.is_superuser;
          this.is_staff = resp.is_staff;
          cookie.set("is_superuser",resp.is_superuser);
          cookie.set("is_staff",resp.is_staff);
        }
      })
    }else{
      
    }
  },
  components: { "chatdialog":chatdialog},
  methods: {
    onMenuItemClick(item) {
      this.$emit("getmenu", item);
    },
    toCourse(tag){
      this.$router.push({name:tag})
      this.$router.go(0)
    },
    login(){
      this.$router.push({name:'login'})
    },
    logout(){
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      this.$router.push('/login')
    },
    myself(){
      if(this.is_superuser||this.is_staff){
       window.open('http://127.0.0.1:8000/admin')
      }else{
        this.$router.push({name:'myself'});
      }
    },
    chat(){
      this.chatVisable=true;
      this.$nextTick(() => {
          this.$refs.chatdialog.init();
      });
    },
    search(){
      getCourse(this.dataForm).then(resp=>{
        this.searchData = resp
        this.$router.push({name:"searchdata",query:{resultData:this.searchData}})
      })
    }
  },
  watch:{
    searchData(newVal,oldVal){
      this.$emit('update',newVal);
    }
  }
};
</script>
<style scoped>
.el-form{
  position: absolute;
  top: 10px;
  right: 290px;
}
.avatar{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
