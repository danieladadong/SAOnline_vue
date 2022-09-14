<template>
<div>
    <shead></shead>
    <el-container style="margin-top: 100px;">
        <el-main>
            <el-row id="school">
                <el-col :span="24">
                  <schoolcard v-bind:schoolData="SchoolData"></schoolcard>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</div>
</template>
<script>
import Shead from '../../views/common/Shead.vue'
import SchoolCard from '../../views/common/SchoolCard.vue'
import {getOrganizations} from '@/api/organization/Organization.js'
export default {
    data(){
        return{
          SchoolData:[]
        }
    },
    components:{
        "shead":Shead,
        "schoolcard":SchoolCard
    },
    created(){
      getOrganizations().then(resp=>{
        if(resp.length!=0){
          this.SchoolData=resp
        }
      })
    },
    methods:{

    }
}
</script>
<style scoped>
 .el-row {
    /* background-color: #26A69A; */
    margin-bottom: 20px;
    margin-left: 70px;
    width: 90%;
  }
  .el-col {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    /* background-color: #26A69A; */
  }
  .grid-content {
        border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /* background-color: #90CAF9; */
  }
</style>