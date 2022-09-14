<template>
<div>
<el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        header-align="center"
        align="center"
        label="课程名">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="organizations[0].name"
        header-align="center"
        align="center"
        label="所属机构">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="teachers[0].name"
        header-align="center"
        align="center"
        label="主讲教师">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="desc"
        header-align="center"
        align="center"
        label="简介">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="degree"
        header-align="center"
        align="center"
        label="难度">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="learn_times"
        header-align="center"
        align="center"
        label="时长">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="tag"
        header-align="center"
        align="center"
        label="分类">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteHandle(scope.row.id)">退出此课程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="position: fixed;bottom: 70px;left: 45%;"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[6, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
</div>
</template>
<script>
import {getUserCourse,deleteUserCourse} from '@/api/users/UserCourse.js'
import {getCourseDetail} from '@/api/course/Courses.js'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            userCourseData:[],
            pageIndex:1
        }
    },
    created(){
        this.getDataList();
    },
    methods:{
        deleteHandle(id){
            let userid = cookie.get("uuid");
            let req = {
                user_id:userid,
                course:id
            }
            let that = this;
            getUserCourse(req).then(resp=>{
            if(resp.length!=0){
                console.log(resp)
                deleteUserCourse(resp[0].id).then(iresp=>{
                    that.$message({
                        message: "删除成功！",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        },
                    });
                    that.dataList=[]
                    that.getDataList();
                });
            }
        });
        },
        getDataList(){
            let userid = cookie.get("uuid");
            let req = {
                user_id:userid,
                page:this.pageIndex,
                size:8
            }
            let that = this;
            getUserCourse(req).then(resp=>{
                if(resp.count!=0){
                    this.totalPage = resp.count;
                    for(var i=0;i<resp.results.length;i++){
                        let courseid = resp.results[i].course;
                        getCourseDetail(courseid).then(iresp=>{
                            if(iresp.length!=0){
                                that.dataList.push(iresp);
                            }
                        });
                    }
                }
            });
        },
        sizeChangeHandle(){

        },
        currentChangeHandle(val){
          this.dataList=[];
          let userid = cookie.get("uuid");
            let req = {
                user_id:userid,
                page:val,
                size:8
            }
            let that = this;
            getUserCourse(req).then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.count;
                    console.log(resp.results[0])
                    for(var i=0;i<resp.results.length;i++){
                        let courseid = resp.results[i].course;
                        getCourseDetail(courseid).then(iresp=>{
                            if(iresp.length!=0){
                                that.dataList.push(iresp);
                            }
                        });
                    }
                }
            });
        }
    }
}
</script>