<template>
    <el-card class="TopCard">
    <i class="el-icon-user" style="color:#606266"/>
        <span class="tips">教师详情</span>
        <el-header>
            <div class="block">
                <el-avatar :src="teacherData.image" :size="50" style="float:left"></el-avatar>
                <h4>{{teacherData.name}}</h4>
                <h5>{{teacherData.work_position}}|</h5>
            </div>
            <h5>所在院校：{{teacherData.organizations[0].name}}|</h5>
            <h5>教学特色：{{teacherData.points}}|</h5>
            <h5>工作年限：{{teacherData.work_year}}年</h5>
        </el-header>
    </el-card>
</template>
<script>
import {getTeacherDetail} from '@/api/organization/Teacher.js'
export default {
    data(){
        return{
            teacherData:[]
        }
    },
    created(){
        let id = this.$route.params.id
        console.log(id)
        getTeacherDetail(id).then(resp=>{
            if(resp.length!=0){
                this.teacherData=resp
            }
        })
    }
}
</script>
<style scoped>
.el-card{
    width: 925px;
    height: 280px;
    position: absolute;
    top: 0px;
    left: 400px;
}
.TopCard .el-card__body{
    height: 300px;
    padding:0px 10px;
}
.el-header{
    width: 925px;
    /* border: 1px solid; */
    position: absolute;
    top: 50px;
    /* left: 100px; */
}
h4{
    float: left;
    margin-left: 30px;
    /* color: #fff; */
}
h5{
    float: left;
    position: relative;
    top: 30px;
    left: -48px;
}
#te{
    width:950px;
    height:225px;
    background-color:#fff;
    position:absolute;
    top: 0px;
    left: 400px;
}
</style>