<template>
    <el-card class="TopCard">
        <!-- 小喇叭 -->
        <i class="el-icon-paperclip" style="color:#606266"/>
        <span class="tips">课件</span>
        <!-- 滚动文字外层div，文字能展示的区域-->
        <div>
            <ul>
                <el-empty v-if="this.courseWareData.length==0" style="margin-left:200px" description="暂无课件"></el-empty>
                <li v-for="item in courseWareData" :key="item"><a :href="item.resource">{{item.name}}</a></li>
            </ul>
        </div>
    </el-card>
</template>
<script>
import {getCourseWare,getCourseWareDetail} from '@/api/course/CourseWare.js'
export default {
    data(){
        return{
            courseWareData:[]
        }
    },
    created(){
        let id = this.$route.params.id;
        let req={
            course_id:id,
            isVideo:0,
            page:1,
            size:10
        }
        getCourseWare(req).then(resp=>{
            if(resp.count!=0){
                this.courseWareData=resp.results
            }
        });
        
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
.tips{
  line-height:50px;
  color:#606266;
  font-weight:bold
}
li{list-style:none}
    .advert-top{position:relative;display:flex;width:100%;height:.88rem;background:linear-gradient(270deg,rgba(80,175,255,1) 0,rgba(13,132,248,1) 48%,rgba(55,159,248,1) 86%,rgba(81,176,255,1) 100%);color:#fff;font-size:.26rem;align-items:center}
    .ico-horn{display:flex;width:.88rem;height:.88rem;justify-content:center;align-items:center}
    .ico-horn>img{width:.32rem;height:.32rem}
    .marquee-wrap{position:relative;display:flex;overflow:hidden;width:100%;height:100%}
    .marquee-box{position:absolute;top:50%;display:flex;white-space:nowrap;transform:translateY(-50%)}
    .marquee-list{margin-right:10px}
    .marquee-list span{padding:0 .04rem;color:#ffe17b;font-weight:700}
</style>