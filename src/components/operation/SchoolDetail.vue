<template>
    <div style="background-color:#eaedf7;height:auto">
        <shead></shead>
        <el-container style="background-color:#eaedf7;margin-top:60px;">
            <img :src="SchoolDetail.image" class="image" style="border-radius:4px">
            <el-main>
                <div class="banner-center">
                  <h3>{{SchoolDetail.name}}</h3>
                </div>
                <div class="center-bottom">
                    <dl>{{SchoolDetail.desc}}</dl>
                </div>
            </el-main>
        </el-container>
        <el-row>
            <el-col :span="24">
                <coursecard v-bind:CourseData="CourseDatas"></coursecard>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Shead from '@/views/common/Shead.vue'
import {getOrganizationDetail} from '@/api/organization/Organization.js'
import CourseCard from '../../views/common/CourseCard.vue'
import {getCourses} from '@/api/course/Courses.js'
import cookie from 'js-cookie'
import Router from '@/router/index'
export default {
    data(){
        return{
            tableData:[],
            SchoolDetail:[],
            CourseDatas:[],
            isfavorite:false,
            isnewCourse:true,
        }
    },
    components:{
        "shead":Shead,
        "coursecard":CourseCard
    },
    methods:{ 
        getSchool(){
            let id = this.$route.params.id
            getOrganizationDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.SchoolDetail=resp
                }
            })
        },
        getOrganizationCourses(){
          let id = this.$route.params.id
          let req={
            organization:id
          }
          getCourses(req).then(resp=>{
            if(resp.length!=0){
              this.CourseDatas = resp
            }
          })
        }
    },
    created(){
      this.getSchool()
      this.getOrganizationCourses()
    }
}
</script>
<style scoped>
.el-row {
    background-color: #B3E5FC;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    position: absolute;
    left: 100px;
    /* margin-left: 100px; */
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #B3E5FC;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #829ac9;
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
    color: #000;
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