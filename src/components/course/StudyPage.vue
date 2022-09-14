<template>
<div>
    <shead></shead>
    <div id="dplayer" style="margin-top: 100px;"></div>
    <el-menu
      style="margin-top: 0px;"
      id="lesson"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu
        :index="item.id"
        v-for="item in lessonData"
        :key="item">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="itemvideo.id"
          v-for="itemvideo in item.videos"
          :key="itemvideo" @click.native="playVideo(itemvideo.url,itemvideo.id,item.id)">{{itemvideo.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <comment></comment>
</div>
</template>

<script>
import Shead from '../../views/common/Shead.vue'
import DPlayer from "dplayer";
import {getLessons} from '@/api/course/Lessons.js'
import Comment from '../../views/operation/Comment.vue'
import cookie from 'js-cookie'
import {addUserVideos} from '@/api/course/UserVideo'
export default {
  data() {
    return {
      player:[],
      lessonData:[],
      dp:"",
      playVideoId:0,
      courseId:0,
      lessonId:0,
      userId:cookie.get("uuid")
    }
  },
  components:{
      "shead":Shead,
      "comment":Comment
  },
  mounted() {
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),   //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        live:false,
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        video: {
        },
        danmaku: {
          // 弹幕
          id: "9E2E3368B56CDBB4",
          api: "https://api.prprpr.me/dplayer/",
          token: "tokendemo", //后端验证令牌
          maximum: 1000, //弹幕最大数量
          addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
          user: "DIYgod", //弹幕用户名
          bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
          unlimited: true, //即使弹幕重叠也显示所有弹幕
        },
      });
      document.oncontextmenu=new Function("event.returnValue=false;");
      document.onselectstart=new Function("event.returnValue=false;");
    },
  created(){
      let id = this.$route.params.id;
      this.courseId = id;
      let req = {
        course_id:id
      }
      getLessons(req).then(resp=>{
        if(resp.length!=0){
          this.lessonData = resp;
        }
      });
    },
    methods:{
      playVideo(url,vid,lid){
        this.playVideoId = vid;
        this.lessonId = lid;
        var str = url.match(/video(.*)/)[0]
        this.dp.switchVideo({
          url:'http://127.0.0.1:8000/api/course/stream_video/?path='+str,
        });
        this.dp.play();
        let that = this
        this.dp.on('ended',function(){
          console.log(that.dp.video.duration)
          let params={
            course:that.courseId,
            learned_time:that.dp.video.duration,
            user:that.userId,
            video:that.playVideoId,
            lesson:that.lessonId,
            is_finish:true
          }
          addUserVideos(params)
        });
      }
    }
};
</script>

<style scoped>
#dplayer {
    width: 900px;
    height: 500px;
    background-color: coral;
    margin-left:100px;
  }
.dplayer-danmaku-item span{
    border: none !important;
}
#lesson{
  width:300px;
  float: right;
  position: relative;
  top: -500px;
  left: -20px;
}
</style>