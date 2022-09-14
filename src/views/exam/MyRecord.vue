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
        prop="exampapers[0].title"
        header-align="center"
        align="center"
        label="试卷名">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="grade"
        header-align="center"
        align="center"
        label="成绩">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="rtime"
        header-align="center"
        align="center"
        label="参与时间">
        <template slot-scope="scope">
            {{dayjs(scope.row.rtime).format("YYYY-MM-DD HH:mm:ss")}}
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
import {getRecords} from '@/api/exam/Record.js'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            dataListLoading:true
        }
    },
    created(){
        this.getDataList();
    },
    methods:{
        getDataList(){
            let userid = cookie.get("uuid");
            let req = {
                user_id:userid
            }
            let that = this;
            getRecords(req).then(resp=>{
                if(resp.length!=0){
                    that.dataList = resp;
                    this.totalPage = resp.length
                    that.dataListLoading=false;
                }else{
                    that.dataListLoading=false;
                }
            });
        }
    }
}
</script>