<template>
<div>
    <el-card
      class="box-card"
      align="middle"
      shadow="hover"
      v-for="item in schoolData"
      :key="item"
      @click.native="detail(item.id)">
        <el-image
            style="width: 100%; height: 100px"
            :src="item.image"
            :fit="fit"></el-image>
            <span style="font-weight:bolder">{{item.name}}</span><br>
            <span>{{item.category}}</span><br>
            <span style="font-size:12px">{{item.address}}</span><br>
    </el-card>
</div>
</template>
<script>
export default {
    props:{
      schoolData:{
        type:Array,
        required:true
      }
    },
    data(){
        return{
            
        }
    },
    methods:{
      detail(id){
        let routeUrl = this.$router.resolve({
        path: `/school/${id}`,
      });
      window.open(routeUrl.href, '_blank');
      },
    },
}
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 267px;
    height: 220px;
    transition: all .5s;
    float:left;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    /* box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important; */
  }
   /* .el-card:hover{
     cursor: pointer;
  } */
</style>