<template>
    <div style="background-color:#eaedf7;height:800px">
        <shead ref="Shead"></shead>
        <el-container style="background-color:#eaedf7;margin-top: 60px;">
            <el-aside width="600px">
                <img :src="CourseDetail.image" class="image" style="border-radius:4px">
            </el-aside>
            <el-main>
                <div class="banner-center">
                  <h3>{{CourseDetail.name}}</h3>
                  <ul>
                    <li>课程学时：{{Math.round(CourseDetail.learn_times/45)}}</li>
                    <li>学科：{{CourseDetail.tag}}</li>
                    <li>教师：{{CourseDetail.teachers[0].name}}</li>
                    <li>学校：{{CourseDetail.organizations[0].name}}</li>
                  </ul>
                </div>
                <div class="center-bottom">
                  <dl>总点击数：{{CourseDetail.click_nums}}</dl>
                  <dl>学生学习数：{{CourseDetail.learn_nums}}</dl>
                  <dl>收藏数：{{CourseDetail.fav_nums}}</dl>
                  <dl>发布时间：{{ this.dayjs(CourseDetail.add_time).format("YYYY-MM-DD HH:mm:ss")}}</dl>
                </div>
                <el-button type="primary" icon="el-icon-s-promotion" circle
                style="float:right; margin-left:30px" @click="addChatList()"></el-button>
                <el-button v-if="!isfavorite" type="warning" icon="el-icon-star-off" circle 
                style="float:right; margin-left:30px" @click="favorite()"></el-button>
                <el-button v-else type="success" icon="el-icon-check" circle 
                style="float:right; margin-left:30px" @click="unfavorite()"></el-button>
                <el-button type="primary" round style="float:right;" @click="gotoStudy(CourseDetail.id)">点击学习</el-button>
            </el-main>
        </el-container>
        <el-row>
            <el-col :span="5">
                <el-menu  @select="handleSelect"
                    :router="true" style="border-radius: 4px;">
                    <el-menu-item
                      index="/teacher/"
                      :route="{path:'/teacher/'+CourseDetail.teacher}"><el-button type="text">教师详情</el-button></el-menu-item>
                    <el-menu-item
                      index="/notice/"
                      :route="{path:'/notice/'+CourseDetail.id}"><el-button type="text">公告</el-button></el-menu-item>
                    <el-menu-item
                      index="/courseware/"
                      :route="{path:'/courseware/'+CourseDetail.id}"><el-button type="text">课件</el-button></el-menu-item>
                    <el-menu-item
                      index="/abstract"
                      :route="{path:'/abstract/'+CourseDetail.id}"><el-button type="text">简介</el-button></el-menu-item>
                    <el-menu-item
                      index="/school"
                      :route="{path:'/school/'+CourseDetail.organization}"><el-button type="text">学校机构</el-button></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="19">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Shead from '../../views/common/Shead.vue'
import {getCourseDetail,updateCourse,getProgress} from '@/api/course/Courses.js'
import {addUserFavorite,deleteUserFavorite,getUserFavorite} from '@/api/users/UserFavorite'
import {addUserCourse,getUserCourse} from '@/api/users/UserCourse'
import {addChatUserList,getChatUserList} from '@/api/operation/ChatUserList'
import cookie from 'js-cookie'
import Router from '@/router/index'
export default {
    data(){
        return{
            tableData:[],
            CourseDetail:[],
            isfavorite:false,
            isnewCourse:true,
            favpriteId:0,
            teacherId:0,
            teacherName:"",
            uuid:cookie.get("uuid"),
            isLogin:false
        }
    },
    components:{
        "shead":Shead
    },
    methods:{
        handleSelect(path){        
            this.$router.push(path)      
        }, 
        gotoStudy(id){
          if(!eval(this.uuid)){
            Router.push({
              path:'/login'
            })
          }else{
          let that = this;
            if(this.isnewCourse){
                let req={
                course:id,
                user:this.uuid,
                add_time:new Date()
              };
              addUserCourse(req).then(resp=>{
                this.$message({
                    message: "添加课程成功！",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                    },
                });
              });
              this.updateLearnNums();
            }
            let routeUrl = this.$router.resolve({
                  path: `/player/${id}`,
                });
            window.open(routeUrl.href, '_self'); 
          }
        },
        favorite(){
            let num = this.CourseDetail.fav_nums;
            this.CourseDetail.fav_nums = num+1;
            let that = this;
            let req={
              category: this.CourseDetail.category,
              degree: this.CourseDetail.degree,
              desc: this.CourseDetail.desc,
              name: this.CourseDetail.name,
              organization: this.CourseDetail.organization,
              tag: this.CourseDetail.tag,
              teacher: this.CourseDetail.teacher,
              fav_nums:this.CourseDetail.fav_nums
            }
            updateCourse(this.CourseDetail.id,req).then(resp=>{
              if(resp.length!=0){
              let req={
                user:this.uuid,
                fav_id:that.CourseDetail.id,
                fav_type:2,
                add_time:new Date()
              }
              addUserFavorite(req).then(resps=>{
                  that.$message({
                    message: "收藏成功！",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                    },
                  });
                  this.isfavorite=true;
                  this.getUCourse();
              })
              }
            })
        },
        unfavorite(){
          deleteUserFavorite(this.favpriteId).then(resp=>{
              this.$message({
                message: "取消收藏成功！",
                type: "success",
                duration: 1500,
                onClose: () => {
                },
              });
              this.isfavorite=false;
          })
        },
        getCourse(){
          let id = this.$route.params.id
          getCourseDetail(id).then(resp=>{
            if(resp.length!=0){
              this.CourseDetail=resp;
              this.teacherId = resp.teacher
              this.teacherName = resp.teachers[0].name
            }
          });
        },
        updateClickNums(){
          let id = this.$route.params.id
          let num = this.CourseDetail.click_nums;
          this.CourseDetail.click_nums = num+1;
          let reqst={
            category: this.CourseDetail.category,
            degree: this.CourseDetail.degree,
            desc: this.CourseDetail.desc,
            name: this.CourseDetail.name,
            organization: this.CourseDetail.organization,
            tag: this.CourseDetail.tag,
            teacher: this.CourseDetail.teacher,
            click_nums:this.CourseDetail.click_nums
          }
          updateCourse(id,reqst).then(click_numresp=>{
          });
        },
        getFavorites(){
          let id = this.$route.params.id
          let req={
            fav_id:id,
            user_id:this.uuid
          }
          getUserFavorite(req).then(resp=>{
            if(resp.length!=0){
              this.isfavorite=true;
              this.favpriteId=resp[0].id
              this.getUCourse()
            }
          });
        },
        getUCourse(){
          let id = this.$route.params.id
          let reqs={
            course:id,
            user_id:this.uuid
          }
          getUserCourse(reqs).then(resp=>{
            if(resp.length!=0){
              this.isnewCourse=false;
            }
          });
        },
        updateLearnNums(){
          let num = this.CourseDetail.learn_nums;
              this.CourseDetail.learn_nums = num+1;
              let reqs={
              category: this.CourseDetail.category,
              degree: this.CourseDetail.degree,
              desc: this.CourseDetail.desc,
              name: this.CourseDetail.name,
              organization: this.CourseDetail.organization,
              tag: this.CourseDetail.tag,
              teacher: this.CourseDetail.teacher,
              learn_nums:this.CourseDetail.learn_nums+1
              }
          updateCourse(this.CourseDetail.id,reqs).then(resp=>{

          });
        },
        addChatList(){
          let params = {
            user:this.uuid,
            username:this.teacherName,
            touser:this.teacherId
          }
          getChatUserList(params).then(resp=>{
            if(resp.length==0){
              addChatUserList(params).then(resp=>{
              })
            }
          })
          this.$refs.Shead.chat()
        },
        getProgress(){
          if(this.isLogin){
            let params={
              uuid:cookie.get("uuid"),
              course:this.$route.params.id
            }
            getProgress(params).then(resp=>{
              if(resp.status==200){
                const h = this.$createElement;
                this.$notify({
                  title: '学情提示',
                  message: h('i', { style: 'color: teal'}, resp.message)
                });
              }
            })
          }
        }
    },
    created(){
      this.isLogin = eval(cookie.get("isLogin"));
      this.getUCourse();
      this.getCourse();
      this.getFavorites();
      this.getProgress();
    }
}
</script>
<style scoped>
.el-row {
    background-color: #eaedf7;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    margin-left: 100px;
  }
  .bg-purple-dark {
    background: #eaedf7;
  }
  .bg-purple {
    background: #eaedf7;
  }
  .bg-purple-light {
    background: #eaedf7;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #eaedf7;
  }
  .image {
    width: 500px;
    height: 300px;
    display: block;
    margin-left: 100px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-aside {
    color: #000000;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    color: #000;
    text-align: center;
    line-height: 160px;
    border-radius: 0px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .banner-center{
    margin-left: 20px;
    float: left;
    width: calc(100% - 300px);
    position: relative;
  }
  .banner-center h3{
    color: #000;
    font-size: 28px;
    font-weight: 500;
    line-height: 33px;
    margin-bottom: 20px;
  }
  .banner-center ul{
    list-style: none;
    overflow: hidden;
    clear: both;
    margin-bottom: 18px;
  }
  .banner-center ul li{
    float: left;
    width: 50%;
    color: #000;
    font-size: 16px;
    line-height: 18px;
    opacity: .75;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2 
  }
  .center-bottom{
    /* width: 300px; */
    overflow: hidden;
    clear: both;
    /* float: left;*/
  }
  .center-bottom dl{
    height: 30px;
    line-height: 30px;
    float: left;
    margin-right: 60px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-left: 20px;
    color: #000;
    opacity: .75;
  }
</style>