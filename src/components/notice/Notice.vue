<template>
<div>
    <el-card class="TopCard">
        <!-- 小喇叭 -->
        <i class="el-icon-chat-dot-round" style="color:#606266"/>
        <span class="tips">公告</span>
        <!-- 滚动文字外层div，文字能展示的区域-->
        <el-table
            :data="noticeData"
                style="width: 100%">
            <el-table-column
                :show-overflow-tooltip="true"
                prop="title"
                label="">
                <template slot-scope="scope">
                    <div style="cursor: pointer" @click="goNotice(scope.row.id)">{{scope.row.title}}</div>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="users[0].name"
                label="">
                <template slot-scope="scope">
                    <div style="cursor: pointer" @click="goNotice(scope.row.id)">{{scope.row.users[0].name}}</div>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="add_time"
                label="">
                <template slot-scope="scope">
                    <div style="cursor: pointer" @click="goNotice(scope.row.id)">{{scope.row.add_time}}</div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <noticedialog ref="NoticeDialog" v-if="dialogvisable"></noticedialog>
</div>
</template>
<script>
import {getNotice,getNoticeDetail} from '@/api/operation/Notice.js'
import NoticeDialog from '../../views/dialog/NoticeDialog.vue'
export default {
    data(){
        return{
            noticeData:[],
            dialogvisable:false
        }
    },
    created(){
        let id = this.$route.params.id
        let req={
            course_id:id,
            page:1,
            size:5
        }
        getNotice(req).then(resp=>{
            if(resp.length!=0){
                this.noticeData=resp;
            }
        })
    },
    components:{"noticedialog":NoticeDialog},
    methods:{
        goNotice(id){
            this.dialogvisable=true;
            this.$nextTick(() => {
                this.$refs.NoticeDialog.init(id);
            });
        }
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
/* 公告title */
.tips{
  line-height:50px;
  color:#606266;
  font-weight:bold
}
li{list-style:none}
    .advert-top{position:relative;display:flex;width:100%;height:.88rem;background:linear-gradient(270deg,rgba(80,175,255,1) 0,rgba(13,132,248,1) 48%,rgba(55,159,248,1) 86%,rgba(81,176,255,1) 100%);color:#fff;font-size:.26rem;align-items:center}
    .ico-horn{display:flex;width:.88rem;height:.88rem;justify-content:center;align-items:center}
    .ico-horn>img{width:.32rem;height:.32rem}
    /* 以下代码与滚动相关 */
    .marquee-wrap{position:relative;display:flex;overflow:hidden;width:100%;height:100%}
    .marquee-box{position:absolute;top:50%;display:flex;white-space:nowrap;transform:translateY(-50%)}
    .marquee-list{margin-right:10px} /* 此处“px”方便回到起点 */
    .marquee-list span{padding:0 .04rem;color:#ffe17b;font-weight:700}
</style>