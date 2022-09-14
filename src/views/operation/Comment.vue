<template>
    <div>
        <div class="my-reply">
            <el-avatar class="header-img" :size="50" :src="myHeader"></el-avatar>
            <div class="reply-info" >
                <el-input v-model="content" placeholder="请输入内容"></el-input>
            </div>
            <div class="reply-btn-box">
                <el-button class="reply-btn" size="medium" type="primary" @click="sendComment()">发表评论</el-button>
            </div>
        </div>
        <div v-for="item in comments" :key="item" class="commentList">
            <el-avatar class="header-img" :size="50" :src="item.users[0].image"></el-avatar>
            <div class="author-name">{{item.users[0].name}}：</div>
            <div class="reply">{{item.comment}}</div>
        </div>
    </div>
</template>
<script>
import {getCommentDetail,getComment,addComment} from '@/api/operation/Comment.js'
export default {
    data(){
        return{
            ids:0,
            content:'',
            myName:'Lana Del Rey',
            myHeader:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            comments:[
                
            ]
        }
    },
    created(){
        this.getData()
    },
    methods: {
        sendComment(){
            let res = {
                user:4,
                comment:this.content,
                add_time:new Date(),
                course:Number(this.ids)
            }
            addComment(res).then(resp=>{
                this.content="";
               this.getData();
            });
        },
        getData(){
            this.ids = this.$route.params.id;
            let req = {
                course_id:this.ids
            }
            getComment(req).then(resp=>{
                if(resp.length!=0){
                    this.comments = resp;
                }
            });
        }
    },    
}
</script>
<style scoped>
.my-reply{
    background-color: #fafbfc;
    width: 900px;
    height: 120px;
    margin-left: 100px;
    margin-top: 60px;
    border-radius: 10px;
}
.my-reply .header-img{
    display: inline-block;
    margin-top: 5px;
}
.my-reply .reply-info{
    display :inline-block;
    margin-left :5px;
    width :90%;
} 
.my-reply .reply-input{
    min-height :20px;
    line-height :22px;
    padding :10px 10px;
    color :#ccc;
    background-color: #fff;
    /* border-radius:5px; */
}
            
.my-reply .reply-btn-box{
    height:25px;
    margin:8px 0;
}
.my-reply .reply-btn-box .reply-btn{
    position: relative;
    float: right;
    margin-right: 15px;
}
.commentList{
    width: 600px;
    height: 90px;
    margin-left: 100px;
    background-color: #ccc;
    border-radius: 10px;
    margin-top: 10px;
    /* border: 1px solid; */
}
.commentList .header-img{   
    float: left;
    margin-top: 10px;
    margin-left: 50px;
}
.author-name{
    display: block;
    position: relative;
    top: 20px;
    left: 10px;
    text-align: left;
}
.reply{
    position: relative;
    top: 20px;
    text-align: left;
    left: 30px;
}
</style>

