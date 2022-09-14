<template>
    <div>
        <el-dialog
            v-if="visible"
            :close-on-click-modal="false"
            :visible.sync="visible">
            <div class="tree_title">
                <h1>{{dataForm.title}}</h1>
                <h3>
                    作者：<span>{{dataForm.users[0].name}}</span> 发布时间：<span>{{dataForm.add_time}}</span>
                </h3>
            </div>
            <div class="vsb_content">
                <span>
                    {{dataForm.content}}
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="closeDialog()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getNoticeDetail} from '@/api/operation/Notice'
export default {
    data(){
        return{
            dataForm:[],
            visible: false
        }
    },
    methods: {
        init(id) {
            this.visible = true;
            if(typeof(id)!="undefined"&&id!=0){
                this.isadd = false;
                getNoticeDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                })
            }
        },
        closeDialog(){
            this.visible=false;
        }
    }
}
</script>
<style>
.tree_title{
    width: 100%;
    height: auto;
    border-bottom: 1px dashed #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.vsn_content{
    display: block;
}
</style>