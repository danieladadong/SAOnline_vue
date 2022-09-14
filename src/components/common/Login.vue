<template>
<div style="height: 100%;">
    <div id="bg"></div>
    <el-card class="box-card">
      <div class="text item">
          <el-form
            :model="LoginData"
            status-icon
            :rules="rules"
            size="medium"
            ref="LoginData"
            label-width="100px"
            class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.number="LoginData.username"
              placeholder="手机号登录"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model.number="LoginData.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:-30px;">
            <el-button type="primary" @click="submitForm('LoginData')">登录</el-button>
            <el-button @click="resetForm('LoginData')">重置</el-button>
            <el-button type="primary" @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <regist v-if="rigistVisable" ref="Regist"></regist>
  </div>
</template>
<script>
import cookie from "js-cookie";
import Regist from '../../views/common/Regist.vue'
import {Login} from '@/api/common/Login'
export default {
  components: {"regist":Regist},
  data() {
        var checkUser = (rule, value, callback) => {
            if (value=="") {
                return callback(new Error("用户不能为空"));
            }
            setTimeout(() => {
                if (value.toString().length != 11) {
                    callback(new Error("手机号长度有误"));
                } else {
                    callback();
                }
            }, 1000);
        };

        var validatePass = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请输入密码"));
        } else {
            if (this.LoginData.checkPass !== "") {
            this.$refs.LoginData.validateField("checkPass");
            }
            callback();
        }
        };
    return {
        rigistVisable:false,
        radio: '1',
        LoginData: {
        username: "",
        password: "",
    },
    rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUser, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login(this.LoginData).then(resp=>{
            if(resp.status==200){
                cookie.set("mobile",resp.mobile)
                cookie.set("isLogin",true);
                this.$router.push('/index')
            }else{
              this.$message({
                message:resp.message,
                type:'error',
              })
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register(){
      this.rigistVisable = true
      this.$nextTick(() => {
        this.$refs.Regist.init();
      });
    },
  },
  created(){
     this.$message({
                type: "info",
                message: "请登录",
              });
  }
};
</script>
<style scoped>
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#bg{
    background:url("../../assets/bg.jpg") no-repeat;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    /* filter: blur(6px); */
    z-index: -2;
    position: absolute;
    top: 0px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 20px;
}
.box-card {
  width: 480px;
  /* height: 280px; */
}
.demo-ruleForm{
  margin-left: -35px;
  margin-top: 50px;
}
.el-form-item{
  width: 450px !important;
}
</style>
