<template>
      <div>
          <el-row>
            <el-col :span="24">
                <div class="block">
                  <el-carousel :interval="4000" height="450px">
                    <el-carousel-item v-for="item in carouselData" :key="item">
                      <el-image :src="item.image" :fit="fill" placeholder=""/>
                    </el-carousel-item>
                  </el-carousel>
                </div>
            </el-col>
          </el-row>
      </div>
</template>
<script>
import {getBanner} from '@/api/course/Courses.js'
import cookie from 'js-cookie'
export default {
    data(){
      return{
          carouselData:null
      }
    },
    methods:{
      getDataList(){
        if(cookie.get("uuid")==undefined){
            this.carouselData=[
              {image:"http://localhost:8000/media/course/2022/02/1.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/2.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/3.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/4.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/5.jpg"},
            ]
        }else{
          let req = {
            uuid:cookie.get("uuid")
          }
          getBanner(req).then(resp=>{
            console.log(resp.length)
            if(resp.length==0){
              this.carouselData=[
              {image:"http://localhost:8000/media/course/2022/02/1.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/2.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/3.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/4.jpg"},
              {image:"http://localhost:8000/media/course/2022/02/5.jpg"},
            ]
            }else if(resp.lehgth!=0){
              this.carouselData = resp
            }
          })
        }
      }
    },
    mounted (){
      this.getDataList()
    },
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .bg-purple-dark {
    background: white;
  }
  .el-row {
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
  }
</style>