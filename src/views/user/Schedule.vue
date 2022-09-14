<template>
  <div>
      <el-form
        :inline="true"
        :model="dataForm"
        style="text-align: left">
        <el-form-item>
          <el-button type="primary" @click="addSchedule()">添加或修改课表</el-button>
        </el-form-item>
      </el-form>
    <!--表格-->
    <el-table
      :data="timeData"
      stripe
      style="width: 100%">
      <el-table-column width="70" label="周" fixed="left" prop="label" align="center"></el-table-column>

      <el-table-column label="上午" align="center">
        <el-table-column
          width="110"
          v-for="(v,i) in titleData" :key="i"
           v-if="v.label==='上午'" align="center">
          <template slot="header" slot-scope="scope">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div v-if="timeShow">
                {{scope.row[sbjectKey[i]]}}<br/>
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="下午" align="center">
        <el-table-column
          width="118"
          v-for="(v,i) in titleData" :key="i"
          v-if="v.label==='下午'" align="center">
          <template slot="header" slot-scope="scope">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div v-if="timeShow">
                {{scope.row[sbjectKey[i]]}}<br/>
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="晚上" align="center">
        <el-table-column
          width="118"
          v-for="(v,i) in titleData"
          :key="i"
          v-if="v.label==='晚上'"
          align="center">
          <template slot="header" slot-scope="scope">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div>
                {{scope.row[sbjectKey[i]]}}<br/>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <scheduledialog v-if="visible" ref="ScheduleDialog"></scheduledialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import {getSchedule} from '@/api/users/Schedule.js'
import ScheduleDialog from '@/views/dialog/ScheduleDialog'
  export default {
    data() {
      return {
        //查询
        defaultProps: {value:'id'},//默认节点名与数据绑定
        positionArr:[],//级联选择值
        sbjectKey:['ones','twos','threes','fours','fives','sixs','sevens','eights','nines'],//科目key值
        timeShow:true,//编辑表与展示表
        teachers:[],//全部教师
        //每天的课表
        timeData:[
            
        ],
        timeId:"",
        //课节数据---标题
        titleData:[
          {
            id:'1',
            count:1,
            label:'上午',
            startTime:'08:30',
            endTime:'09:15'
          },
          {
            id:'2',
            count:2,
            label:'上午',
            startTime:'09:15',
            endTime:'10:00'
          },
          {
            id:'3',
            count:3,
            label:'上午',
            startTime:'10:20',
            endTime:'11:05'
          },
          {
            id:'4',
            count:4,
            label:'上午',
            startTime:'11:05',
            endTime:'11:50'
          },
          {
            id:'5',
            count:5,
            label:'下午',
            startTime:'13:30',
            endTime:'14:15'
          },
          {
            id:'6',
            count:6,
            label:'下午',
            startTime:'14:15',
            endTime:'15'
          },
          {
            id:'7',
            count:7,
            label:'下午',
            startTime:'15:20',
            endTime:'16:05'
          },
          {
            id:'8',
            count:8,
            label:'下午',
            startTime:'16:05',
            endTime:'16:50'
          },
          {
            id:'9',
            count:9,
            label:'晚上',
            startTime:'19:00',
            endTime:'21:00'
          },
        ],
        visible:false
      }
    },
    components:{"scheduledialog":ScheduleDialog},
    created(){
        this.getTimeTableFind();
    },
    methods:{
      //获取课表
      getTimeTableFind(){
          let userid = cookie.get("uuid");
          let req={
              user_id:userid
          }
          getSchedule(req).then(resp=>{
              if(resp.length!=0){
                  this.timeData = resp
              }
          })
      },
      addSchedule() {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.ScheduleDialog.init();
        });
      },
    }
}
</script>
<style scoped>
  .tabletitle-timeline{
    line-height: 18px!important;
  }
</style>