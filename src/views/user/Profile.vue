<template>
    <div>
        <el-form label-width="100px" v-model="dataFrom" size="small" label-position="right">
            <el-form-item label="用户昵称：" prop="nick_name">
                <el-input auto-complete="off" v-model="dataForm.nick_name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
                <el-select v-model="dataForm.gender" style="width:100%">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生年月日：" prop="birthday">
                <el-input auto-complete="off" v-model="dataForm.birthday"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                <el-input auto-complete="off" v-model="dataForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input auto-complete="off" v-model="dataForm.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dataFormSubmit()">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import cookie from  "js-cookie";
import {getUserProfileDetail,updateUserProfile} from "@/api/users/Userprofile"
export default {
  components: {},
    data(){
        return{
            dataForm:{
                nick_name:"",
                gender:"",
                birthday:"",
                mobile:"",
                address:""
            },
            options:[
                {
                    label:"男",
                    value:"male"
                },
                {
                    label:"女",
                    value:"female"
                }
            ]
        }
    },
    created(){
        var id = cookie.get("uuid")
        getUserProfileDetail(id).then(resp=>{
            console.log(resp.length)
            if(resp.length!=0){
                this.dataForm=resp
            }else{
                this.$message({
                    message: "获取个人信息失败",
                    type: "failed",
                    duration: 1500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            }
        })
    },
    methods:{
        dataFormSubmit(){
            let id = cookie.get("uuid")
            delete this.dataForm.image
            updateUserProfile(id,this.dataForm).then(resp=>{
                if(resp.length!=0){
                    this.$message({
                        message: "修改成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        },
                    });
                    this.$parent.getProfile()
                }else{
                    this.$message({
                        message: "修改失败",
                        type: "failed",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                        },
                    });
                }
            })
        }
    }
}
</script>