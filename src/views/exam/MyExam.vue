<template>
<div>
<el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%">
      <el-table-column
        :show-overflow-tooltip="true"
        prop="[0].courses[0].name"
        header-align="center"
        align="center"
        label="课程名">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="[0].title"
        header-align="center"
        align="center"
        label="试卷">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="[0].time"
        header-align="center"
        align="center"
        label="时间（分钟）">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="[0].examtime"
        header-align="center"
        align="center"
        label="发布时间">
        <template slot-scope="scope">
            {{dayjs(scope.row[0].examtime).format("YYYY-MM-DD HH:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="goTest(scope.row[0].course)">去测试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="position: fixed;bottom: 70px;left: 45%;"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
</div>
</template>
<script>
import {getUserCourse,deleteUserCourse} from '@/api/users/UserCourse.js'
import {getExam} from '@/api/exam/Exam.js'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            userCourseData:[],
            dataListLoading:true
        }
    },
    created(){
        this.getDataList();
    },
    methods:{
        goTest(id){
            let routeUrl = this.$router.resolve({
                path: `/exam/${id}`,
            });
            window.open(routeUrl.href, '_blank');
        },
        getDataList(){
            let userid = cookie.get("uuid");
            let req = {
                user_id:userid
            }
            let that = this;
            getUserCourse(req).then(resp=>{
                if(resp.length!=0){
                    for(var i=0;i<resp.length;i++){
                        let courseid = resp[i].course;
                        let requ = {
                            course_id:courseid
                        }
                        getExam(requ).then(iresp=>{
                            this.totalPage=this.totalPage+iresp.length
                            if(iresp.length!=0){
                                that.dataList.push(iresp);
                            }
                        });
                    }
                    that.dataListLoading=false;
                }else{
                    that.dataListLoading=false;
                }
            });
        }
    }
}
</script>