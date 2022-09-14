<!-- 考试系统 -->
<template>
  <div class="exam">
    <div class="main">
      <div class="header-wrapper">
        <div class="inner">
          <el-row>
            <el-col :span="18">
              <div class="grid-content bg-purple ovf left">
                <div class="index">{{title}}</div>
              </div>
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="mian-body">
        <div class="main-center">
          <div class="body-wrapper">
            <div class="questions">
              <div class="questions-title">单选题(共{{examinationData.length}}题)</div>
              <div class="questions-content">
                <el-card class="box-card" shadow="never">
                  <el-form v-model="formData">
                    <el-form-item>
                      <div
                        v-for="item in examinationData" :key="item">
                        <div slot="header" class="clearfix">
                            <span>{{item.title}} ({{item.score}}分)</span>
                        </div>
                        <div class="text item">
                            <el-radio-group v-model="formData.pid[item.id]">
                                <el-radio label="A">A：{{item.a}}</el-radio>
                                <el-radio label="B">B：{{item.b}}</el-radio>
                                <el-radio label="C">C：{{item.c}}</el-radio>
                                <el-radio label="D">D：{{item.d}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">交卷</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </div>
          </div>
        </div>
        <div class="main-right">
          <div class="nav">
            <ul v-show="!checkResult">
              <li class="menu-item">
                <div class="item-label">剩余时间</div>
                <div class="item-data">
                  <Time
                    @show="handInHand"
                    :status="submitView"
                    :examtime="examtime"
                    v-if="examtime!=''"
                  ></Time>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getExam,testExam} from '@/api/exam/Exam.js'
import cookie from 'js-cookie'
import Time from '@/components/exam/Time'
export default {
  name: "Exam",
  data() {
    return {
      title: "",
      examinationData: "",
      eid:11,
      submitView: false,
      checkResult: false, // 左侧栏、右侧栏、答题结果栏
      formData:{
        id:0,
        user:cookie.get("uuid"),
        pid:[],
        course:this.$route.params.id
      },
      examtime:"",
    };
  },
  components: {
    "Time":Time
  },
  methods: {
    // 退出考试系统
    esc() {
      this.$router.push({
        path: "/"
      });
    },
    handInHand() {
        this.answersData.value = this.radio || "";
        this.onSubmit(); //提交答案
    },
    // 主动交卷
    onSubmit() {
      let that = this;
      this.$confirm("确定交卷吗?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "交卷",
        cancelButtonText: "不交卷",
        type: "warning"
      })
        .then(() => {
            var dict = {}
            for(var i=0;i<this.formData.pid.length;i++){
                if(this.formData.pid[i]!=null){
                  dict[i]=this.formData.pid[i]
                }
            }
            this.formData.pid=(dict);
            console.log(this.formData)
            testExam(this.formData).then(resp=>{
                that.$message({
                  message: "提交成功!您的成绩为"+resp,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    window.opener = null;
                    window.open("about:blank", "_top").close()
                  },
                });
                

            })
        })
        .catch(err => {
        });
    },
    madeTime(serverTime1, begin1, duration1) {
      var serverTime = new Date(serverTime1); // 系统时间
      var duration = new Date(duration1); //考试时间
      if (begin1 != null) {
        var begin = new Date(begin1); //开始时间
        console.log(begin.getTime())
        var residue = duration.getTime() - serverTime.getTime(); // 倒计时
      } else {
        // eslint-disable-next-line no-redeclare
        var residue = duration.getTime() - serverTime.getTime(); // 倒计时
      }
      return residue;
    },
    toHHmmss(data) {
      let date = {};
      let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = (data % (1000 * 60)) / 1000;
      date.hours = hours;
      date.minutes = minutes;
      date.seconds = seconds;
      return date;
    },
  },
  created(){
      let ids = this.$route.params.id
      let req = {
        course_id:ids
      }
      getExam(req).then(resp=>{
        if(resp.length!=0){
          this.formData.id = resp[0].id;
          this.title = resp[0].title
          this.examinationData = resp[0].pid
          var times = Number(resp[0].time)
          var curTime = new Date();
          var addHour = curTime.setHours(curTime.getHours() + (times/60));
          this.examtime = this.toHHmmss(
            this.madeTime(
              new Date(),
              new Date(),
              addHour,
            )
          );
        }
      });
  }
};
</script>


<style scoped lang="scss" >
.item{
  margin-top: 20px;
}
.clearfix{
  margin-top: 20px;
}
::v-deep .el-progress__text {
  display: none;
}
::v-deep .el-select .el-input__inner:focus {
  border-color: #55b6da;
}
::v-deep .el-select {
  border: none;
}
::v-deep .el-select-dropdown__item.selected {
  color: #55b6da !important;
  font-weight: bold;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #55b6da;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #55b6da;
  background: #55b6da;
}
::v-deep .el-radio__inner:hover {
  border-color: #55b6da;
}
::v-deep .el-radio {
  display: block;
  margin: 20px 0;
}
.inner {
  padding: 0px 90px;
}
.exam {
  background: #ecf1f6;
  height: 100%;
  min-height: 100%;
}
.text .item{
  width: 600px;
}
.main {
  .header-wrapper {
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    .left {
      display: flex;
      align-items: center;
      font-size: 18px;
      .logo {
        width: 150px;
        margin-right: 120px;
        img {
          width: 100%;
        }
      }
    }
    .right {
      div {
        float: right;
        font-size: 16px;
      }
      .esc {
        width: 120px;
        height: 38px;
        line-height: 38px;
        margin: 21px 0;
        color: #fff;
        background: #55b6da;
        border-radius: 30px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        &:hover {
          filter: brightness(80%);
        }
        &:active {
          filter: brightness(60%);
        }
      }
      .name {
        margin-right: 55px;
        font-weight: bold;
      }
    }
  }
  .mian-body {
    .main-side {
      display: inline-block;
      height: calc(100% - 140px);
      position: fixed;
      top: 120px;
      width: 240px;
      left: 90px;
      background: #fff;
      box-shadow: 0 1px 4px 0 rgba(58, 62, 81, 0.1);
      .title {
        position: relative;
        text-align: left;
        margin: 23px 0px 0px 12px;
        .title_border {
          display: inline-block;
          width: 4px;
          height: 26px;
          background: #33394b;
          border-radius: 15px;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        .title_content {
          margin-left: 14px;
          font-size: 18px;
          font-weight: 600;
          color: #27274a;
        }
      }
      .card-content-list {
        height: calc(100% - 38px);
        overflow: auto;
        .card-content {
          padding: 0 12px 0 12px;
          position: relative;
          .card-content-title {
            font-size: 14px;
            color: #27274a;
            font-weight: 600;
            padding-bottom: 12px;
            padding-top: 20px;
          }
          .box-list {
            padding-bottom: 0;
            position: relative;
            left: -5px;
            font-size: 0;
            margin-right: -15px;
            .box {
              height: auto;
              line-height: unset;
              position: relative;
              margin-bottom: 15px;
              font-size: 14px;
              width: 35px;
              margin-top: unset;
              margin-right: unset;
              display: inline-block;
              .checki {
                border: 1px solid #dcdfe6;
                color: #dcdfe6;
                width: 27px;
                height: 27px;
                text-align: center;
                display: inline-block;
                line-height: 27px;
                background: #fff;
                border-radius: 50%;
                cursor: pointer;
              }
              .checked {
                color: #fff;
                background: #55b6da;
              }
              .check-error {
                color: #fff;
                background: #ec6941;
              }
            }
          }
        }
      }
    }
    .main-center {
      margin: 120px 230px 0px 360px;
      height: 100vh;
      .body-wrapper {
        color: #27274a;
        width: 100%;
        background: #ffffff;
        border: 1px solid #dedede;
        border-radius: 4px;
        .questions-title {
          font-size: 18px;
          line-height: 25px;
          padding: 18px 20px;
          background: #fafafa;
          border-bottom: 1px solid #dedede;
        }
        .questions-content {
          padding-left: 30px;
          padding-right: 75px;
        }
        .question-content {
          border-bottom: 1px solid #dedede;
          padding: 30px 0;
          position: relative;
          &:last-child {
            border: none;
          }
          .exam-question {
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
            .question-index {
              color: #55b6da;
              position: absolute;
              left: -25px;
              top: 0;
              display: inline-block;
              width: 40px;
              line-height: 22px;
              text-align: right;
            }
          }
          .analysis {
            overflow: auto;
            background: rgba(222, 222, 222, 0.2);
            border-radius: 4px;
            padding: 15px 20px;
            line-height: 24px;
            margin-top: 10px;
            position: relative;
            .question-icon-wrapper {
              position: absolute;
              right: 10px;
              top: 14px;
              .sign {
                width: 48px;
                height: 28px;
                position: absolute;
                color: #fff;
                top: 10px;
                right: 0;
                font-size: 14px;
                border-radius: 2px;
                line-height: 28px;
                text-align: center;
                font-style: normal;
              }
              .icon-error {
                background: #ec6941;
              }
              .icon-right {
                background: #55b6da;
              }
            }
            .analysis-row {
              font-size: 14px;
              margin-top: 10px;
              min-height: 24px;
              padding-left: 80px;
              padding-right: 60px;
              position: relative;
              .analysis-title {
                position: absolute;
                width: 80px;
                left: 0;
                top: 0;
              }
              .question-analysis {
                text-align: justify;
              }
              .error {
                color: #f72a3a;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .main-right {
      right: 90px;
      bottom: 20px;
      position: fixed;
      top: 120px;
      width: 120px;
      .nav {
        color: #27274a;
        line-height: 20px;
        padding: 0 10px;
        background: #ffffff;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-bottom: 10px;
        text-align: center;
        .menu-item {
          padding: 14px 0;
          border-bottom: 1px solid #dedede;
        }
        .menu-item:last-child {
          border: none;
        }
        .pass {
          color: #55b6da;
        }
        .item-result,
        .unpass {
          color: rgb(236, 105, 65);
        }
        .item-label {
          margin-bottom: 6px;
        }
        .item-data {
          font-size: 18px;
          line-height: 22px;
          color: #ff0000;
          font-weight: 400;
        }
        .item-press {
          line-height: 17px;
          margin-bottom: 7px;
          color: #27274a;
          font-size: 14px;
          & span:nth-child(1)::after {
            content: "/";
            margin: 0 5px;
          }
        }
      }
      .btn {
        bottom: -10px;
        position: absolute;
        width: 100%;
        margin-bottom: 10px;
        cursor: pointer;
        text-align: center;
        height: 38px;
        line-height: 38px;
        border-radius: 20px;
        color: #fff;
        background: #33394b;
        user-select: none;
        &:hover {
          filter: brightness(120%);
        }
        &:active {
          filter: brightness(60%);
        }
      }
    }
  }
}
</style>



