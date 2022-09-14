<template>
  <el-dialog
    v-if="visible"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-input
        v-model="dataForm.id"
        style="display: none"></el-input>
      <el-form-item label="周">
        <el-select
          v-model="dataForm.label"
          placeholder="请选择周几"
          style="width: 100%">
          <el-option
            v-for="item in weekData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第1节">
        <!-- <el-input v-model="dataForm.postType" placeholder=""></el-input> -->
         <el-select
          v-model="dataForm.ones"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第2节">
          <el-select
          v-model="dataForm.twos"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
        </el-form-item>
      <el-form-item label="第3节">
        <!-- <el-input v-model="dataForm.inTime" placeholder=""></el-input> -->
        <el-select
          v-model="dataForm.threes"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第4节">
        <el-select
          v-model="dataForm.fours"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.label"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第5节">
        <el-select
          v-model="dataForm.fives"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第6节">
        <el-select
          v-model="dataForm.sixs"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第7节">
        <el-select
          v-model="dataForm.sevens"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第8节">
        <el-select
          v-model="dataForm.eights"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第9节">
        <el-select
          v-model="dataForm.nines"
          placeholder="请选择课程"
          style="width: 100%">
          <el-option
            v-for="item in courseData"
            :key="item.name"
            :label="item.label"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cookie from 'js-cookie'
import {getSchedule,updateSchedule,addSchedule} from '@/api/users/Schedule'
import {getUserCourse} from '@/api/users/UserCourse'
import {getCourseDetail} from '@/api/course/Courses'
export default {
  data() {
    return {
      visible: false,
      weekData:[
        {
          label:"周一",
          name: "周1"
        },
        {
          label:"周二",
          name: "周2"
        },
        {
          label:"周三",
          name: "周3"
        },
        {
          label:"周四",
          name: "周4"
        },
        {
          label:"周五",
          name: "周5"
        }
      ],
      dataForm: {
        id:0,
        label:"",
        ones:"",
        twos:"",
        threes:"",
        fours:"",
        fives:"",
        sixs:"",
        sevens:"",
        eights:"",
        nines:"",
      },
      courseData: [],
    };
  },
  watch:{
      'dataForm.label': function(val){
        let req = {
          user_id:cookie.get("uuid"),
          label:val
        }
        getSchedule(req).then(resp=>{
          if(resp.length!=0){
            this.dataForm=resp[0]
          }
        });
      },
      deep:true
  },
  methods: {
    init() {
      this.visible = true;
      let req = {
        user_id:cookie.get("uuid")
      }
      let that = this;
      getUserCourse(req).then(resp=>{
        if(resp.length!=0){
          for(var i in resp){
            let courseid = resp[i].course;
            getCourseDetail(courseid).then(resps=>{
              let course={
                name:resps.name,
                label:resps.name
              }
              console.log(course)
              that.courseData.push(course);
            })
            this.courseData.push({name:"空",label:"取消此课程"})
          }
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      for(var key in this.dataForm){
        if(this.dataForm[key]==""){
          delete this.dataForm[key]
        }
      }
      updateSchedule(this.dataForm.id,this.dataForm).then(resp => {
          if (resp.length!=0) {
            this.$message({
              message: "课表更新成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
              },
            });
            this.$parent.getTimeTableFind();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
  },
};
</script>
