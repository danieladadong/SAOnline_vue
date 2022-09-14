<template>
<div>
    <shead></shead>
    <carousel style="margin-top: 120px;"></carousel>
    <el-container>
        <el-main>
            <el-row id="course">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <coursecard
                          v-bind:CourseData="HotCourseData"></coursecard>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <coursecard
                          v-bind:CourseData="BoutiqueCourseData"></coursecard>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <coursecard
                          v-bind:CourseData="FreeCourseData"></coursecard>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</div>
</template>
<script>
import Shead from '../views/common/Shead.vue';
import Carousel from '../views/common/Carousel.vue';
import CourseCard from '../views/common/CourseCard.vue';
import cookie from 'js-cookie'
import {getCourses} from '@/api/course/Courses.js'

export default {
    data(){
        return{
            activeName: 'first',
            HotCourseData:[],
            BoutiqueCourseData:[],
            FreeCourseData:[]
        }
    },
    created(){
      var isLogin = cookie.get("istLogin");
      let hot={
        category:"热门",
        is_publish:true,
        page:1,
        size:10
      }
      getCourses(hot).then(resp=>{
        if(resp.count!=0){
          this.HotCourseData=resp.results;
        }
      });
      let boutique={
        category:"精品",
        is_publish:true,
        page:1,
        size:10
      }
      getCourses(boutique).then(resp=>{
        if(resp.count!=0){
          this.BoutiqueCourseData=resp.results;
        }
      });
      let req={
        is_publish:true,
        page:1,
        size:10
      }
      getCourses(req).then(resp=>{
        if(resp.count!=0){
          this.FreeCourseData=resp.results;
        }
      });
    },
    components:{
        "shead":Shead,
        "carousel":Carousel,
        "coursecard":CourseCard,
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style scoped>
  .el-row {
    background-color: #eaedf7;
    margin-bottom: 20px;
    margin-left: 70px;
    width: 90%;
  }
  .el-col {
    background-color: #eaedf7;
  }
  .bg-purple-dark {
    background: #eaedf7;
    background-color: #eaedf7;
  }
  .bg-purple {
    background: #eaedf7;
  }
  .bg-purple-light {
    background: #eaedf7;
  }
  .grid-content {
        border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #eaedf7;
  }
</style>