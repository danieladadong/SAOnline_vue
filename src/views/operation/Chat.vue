<template>
  <el-dialog
    title="聊天框"
    :visible.sync="dialogTableVisible"
    custom-class="custom"
    :modal="false"
    @close='closeDialog'
    :show-close="true">
    <div class="wxchatBorderLeft">
      <el-row>
        <div style="padding: 10px;">
          <div style="display: inline-block;">
            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input2" size="mini">
            </el-input>
          </div>
          <div style="display: inline-block;">&nbsp;&nbsp;
          </div>
        </div>
      </el-row>
      <el-row>
        <div>
          <el-col :span="24" style="background-color: #f5faff;height:60px;margin-top:4px"
          v-for="item in chatUserList"
          :key="item"
          v-on:click.native="show(item.touser,item.username)">
            <div style="display: inline-block;">
              <el-col>
                <div class="wxchatPeople">{{item.username}}</div>
              </el-col>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="wxchatBorderRightTop">
       <h3 style="position:absolute;left:45%;top:20px">{{username}}</h3>
    </div>
    <div class="wxchatBorderRightMid">
      <el-scrollbar style="height: 100%">
      <div style="margin-left: 30px;margin-top: 15px;" v-for="item in message" :key="item">
        <div align="center" style="padding: 15px 0;">
        </div>
        <el-row v-if="uuid==item.touuid">
          <el-col :span="2">
          <el-avatar shape="square" :src="squareUrl" style="width: 35px;height: 35px;"></el-avatar>
          </el-col>
          <el-col :span="12">
            <div class="chatPop1">
              <span style="line-height: 23px;float:left;"
               >{{item.message}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="21">
            <div class="chatPop2">
              <span style="line-height: 23px;">{{item.message}}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <el-avatar shape="square" :src="squareUrl" style="width: 35px;height: 35px;"></el-avatar>
          </el-col>
        </el-row>
      </div>
      </el-scrollbar>
      
    </div>
    <div class="wxchatBorderRightBottom">
      <div style="margin: 10px 17px;">
        <el-input type="textarea" :autgth="500" v-model="textarea">
        </el-input>
      </div>
      <div class="sendButton">
        <el-button size="mini" @click="sendText()">发送</el-button>
      </div>
    </div>

  </el-dialog>
  
</template>

<script>
import cookie from 'js-cookie'
import {getChatUserList} from '@/api/operation/ChatUserList'
export default{
  data(){
    return{
      squareUrl:"../../assets/sdwu.jpg",
      input2:[],
      dialogTableVisible:true,
      msg:"",
      message:[],
      textarea:"",
      chatSocket:"",
      uuid:cookie.get('uuid'),
      touuid:null,
      nickName:cookie.get("nick_name"),
      chatUserList:null,
      username:""
    }
  },
  mounted (){
    
  },
  methods:{
    init(){
      this.dialogTableVisible=true;
      this.initWebSocket()
      let req={
        user:this.uuid
      }
      getChatUserList(req).then(resp=>{
        if(resp.length!=0){
          this.chatUserList = resp
        }
      })
    },
    show(id,username){
      this.touuid = id
      this.username = username
      this.message=[]
    },
    initWebSocket(){
        // 判断页面有没有存在websocket连接
        // if (window.WebSocket) {
        var that = this;
        const wss_protocol = (window.location.protocol == 'https:') ? 'wss://': 'ws://';
        this.chatSocket = new WebSocket(wss_protocol + '127.0.0.1:8000' + '/ws/chat/'+this.uuid+'/');
        this.chatSocket.onopen = function (e){
            chatSocket.send(JSON.stringify({
                'code': 101,
                'id':this.uuid,
                'username':this.nickName,
                'message':""
            }));
        };
        this.chatSocket.onmessage = function(e) {
            // this.message.push(JSON.parse(e.data));
            let Me = JSON.parse(e.data)
            that.message.push(Me)
            if(Me.touuid==that.uuid){
              that.chatUserList = new Array();
              let user = {"touser":Number(Me.uuid),"username":Me.username}
              that.chatUserList.push(user);
              that.touuid=Number(Me.uuid)

            }
        };
        this.chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };
        // }
    },
    sendText(){
        let params = {
            'code':100,
            'username':this.nickName,
            'message': this.textarea,
            'uuid':this.uuid,
            'touuid':this.touuid
        }
        this.chatSocket.send(JSON.stringify(params));
        this.msg=this.textarea
        this.message.push(params)
        this.textarea="";
    },
    closeDialog(){
      this.dialogTableVisible=false;
      this.ws.onclose()//清空数据
      this.$parent.$router.go(0)
    }
  }
}
</script>

<style scoped>

  .el-dialog__header {
    padding: 20px 20px 10px;
  }

 .chatPop1 :hover {
    background-color: #FAFAFA;
  }

  .chatPop1 span {
    background-color: #fff;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 0 10px 10px;
    position: relative;
    border: 1px solid #E3E3E3;
    max-width: 290px;
  }

  .chatPop1 span::after {
    content: '';
    border: 8px solid #ffffff00;
    border-right: 8px solid #fff;
    position: absolute;
    top: 8px;
    left: -16px;
  }

  .chatPop2 :hover {
    background-color: #2683f5;
  }

  .chatPop2 span {
    background-color: #2683f5;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 15px 10px 10px;
    position: relative;
    border: 1px solid #E3E3E3;
    max-width: 290px;
    float: right;
    color: #fff;
  }

  .chatPop2 span::after {
    content: '';
    border: 8px solid #ffffff00;
    border-right: 8px solid #2683f5;
    position: absolute;
    top: 8px;
    right: -16px;
    transform: rotateY(180deg)
  }

  .custom {
    border: 0px solid blue;
    height: 570px;
    width: 795px;
  }

  .wxchatBorder {
    width: 795px;
    height: 650px;
    border: 1px solid red;
    margin-left: -20px;
    margin-top: -59.5px;

  }

  .wxchatBorderLeft {
    width: 241px;
    height: 500px;
    background-color: #eeebe9;
    /* // border: 1px solid gray; */
    display: inline-block;
    float: left;
    margin-left: -21px;
    margin-top: -31px;
  }

  .wxchatPeople {
    color: #000000;
    font-size: 14px;
    line-height: 60px;
    text-align: left;
  }

  .wxchatNews {
    color: #999;
    padding-top: 5px;
    font-size: 12px;
    position: absolute;
    top: 35px;
  }

  .wxchatName {
    color: #000000;
    font-size: 20px;
    float: left;
    padding-left: -80px;
    padding-top: 20px;
  }

  .wxchatMore {
    color: #999;
    font-size: 20px;
    float: right;
    margin-right: -15px;
    padding-top: 25px;
  }

  .wxchatBorderRight {
    max-width: 245px;
    height: 470px;
    display: inline-block;
    float: right;
    margin-right: -22px;
    margin-top: -60px;
  }

  .wxchatBorderRightTop {
    width: 426px;
    height: 60px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e7e7e7;
    display: block;
    /* float: right; */
    position: relative;
    top: -30px;
    left: 220px;
    /* margin-right: -320px;
    margin-top: -630px; */
  }

  .wxchatBorderRightMid {
    width: 425px;
    height: 328px;
    background-color: #f5f5f5;
    border: 0.5px solid #999;
    display: block;
    /* float: right; */
    position: absolute;
    top: 110px;
    left: 240px;
    margin-right: -20px;
  }

  .wxchatBorderRightBottom {
    width: 425px;
    height: 112px;
    background-color: #fff;
    border: 1px solid #eee;
    display: block;
    float: right;
    position: absolute;
    top: 440px;
    left: 240px;
    margin-right: -20px;
  }

  .wxchatIcon1 {
    display: inline-block;
    padding: 8px 10px 10px 30px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon2 {
    display: inline-block;
    padding: 8px 10px 10px 20px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon3 {
    display: inline-block;
    padding: 8px 10px 10px 10px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon4 {
    display: inline-block;
    padding: 8px 10px 10px 0px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .sendButton {
    float: right;
    margin-top: 5px;
    margin-right: 28px;
  }
.el-scrollbar {
  /* height: 70px; */
  overflow-x: hidden;
  }

</style>