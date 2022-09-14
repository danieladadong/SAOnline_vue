<template>
  <el-dialog
    :title="注册"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="dataForm.username"
          placeholder="请输入电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="dataForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="名" prop="first_name">
        <el-input type="text" v-model="dataForm.first_name" placeholder="请输入名"></el-input>
      </el-form-item>
      <el-form-item label="姓" prop="last_name">
        <el-input type="text" v-model="dataForm.last_name" placeholder="请输入姓"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="dataForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cookie from "js-cookie";
import {Regist} from '@/api/common/Login.js'
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dataForm: {
        username: "",
        password: "",
        first_name:"",
        last_name:"",
        email:"",
      },
      dataRule: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" },{
            validator: checkPhone,
            type: "number",
            message: "手机格式有误",
            trigger: ["blur", "change"],
          },],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        first_name: [{ required: true, message: "名不能为空", trigger: "blur" }],
        last_name: [{ required: true, message: "姓不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          Regist(this.dataForm).then(resp => {
            if (resp.status == 200) {
              this.$message({
                message: resp.message,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshData");
                },
              });
            } else {
              this.$message.error(resp.message);
            }
          });
        }
      });
    },
  },
};
</script>
