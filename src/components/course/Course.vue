<template>
<div>
    <shead></shead>
    <el-container style="margin-top: 100px;">
        <el-main>
            <el-row id="course">
                <el-col :span="24">
                  <coursecard v-bind:CourseData="CourseDatas"></coursecard>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</div>
</template>
<script>
import Shead from '../../views/common/Shead.vue'
import CourseCard from '../../views/common/CourseCard.vue'
import {getCourses} from '@/api/course/Courses.js'
export default {
    data(){
        return{
          CourseDatas:null
        }
    },
    components:{
        "shead":Shead,
        "coursecard":CourseCard
    },
    methods:{

    },
    created(){
      getCourses().then(resp=>{
        if(resp.length!=0){
          this.CourseDatas=resp;
        }
      });
    }
}
</script>
<style scoped>
.el-row {
    margin-bottom: 20px;
    width: 87%;
    height: 800px;
    position: absolute;
    left: 75px;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f5f7fa;
  }
  .coursecard{
      margin-left:100px
  }
</style>