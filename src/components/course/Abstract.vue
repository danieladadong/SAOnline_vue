<template>
    <el-card class="TopCard">
        <!-- 小喇叭 -->
        <i class="el-icon-document" style="color:#606266"/>
        <span class="tips">简介</span>
        <!-- 滚动文字外层div，文字能展示的区域-->
        <div>
            <span class="tastrule_center" v-html="abstractData.detail"></span>
        </div>
    </el-card>
</template>
<script>
import {getCourseDetail} from '@/api/course/Courses.js'
export default {
    data(){
        return{
            abstractData:[]
        }
    },
     created(){
         let id = this.$route.params.id
         getCourseDetail(id).then(resp=>{
             if(resp.length!=0){
                 this.abstractData = resp
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