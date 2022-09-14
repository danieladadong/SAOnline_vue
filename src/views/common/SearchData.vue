<template>
    <div>
        <shead @update="update"></shead>
        <ul  class="courseList">
            <div  class="courseDetail">
                <div  class="numberTitle">
                    共{{num}}条相关的结果
                </div> 
                <div  class="searchList">
                    <li v-for="item in resultData" :key="item" style="list-style-type: none;"
                    @click="detail(item.id)">
                        <div  class="courseImg">
                            <div  class="course-tag"><!----></div> <!----> 
                            <img  alt="" class="imgSrc" :src="item.image" lazy="loaded"> <!----> <!---->
                        </div> 
                        <div class="right">
                            <div class="right-top">
                                <span class="name">{{item.name}}</span> 
                            </div> 
                            <div class="teacherAndschool">
                                <span class="teacher">
                                    <span class="name">{{item.teachers[0].name}}</span>
                                </span> 
                                <span class="shuxian">|</span> 
                                <span class="schoolName">{{item.organizations[0].name}}</span>
                            </div> 
                            <div  class="learnNum">
                                <span >
                                    已学人数<span  class="light">{{item.learn_nums}}</span>
                                </span> 
                                <span >
                                    学时<span  class="light">{{Math.round(item.learn_times/45)}}</span>
                                </span> 
                                <span >
                                    课程须知<span  class="light">{{item.you_need_know}}</span>
                                </span>
                                <span >
                                    发布时间<span  class="light">{{item.add_time}}</span>
                                </span>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </ul>
    </div>
</template>
<script>
import Shead from '@/views/common/Shead'
export default {
    data(){
        return{
            resultData:null,
            num:0
        }
    },
    components:{"shead":Shead},
    methods:{
        detail(id){
            let routeUrl = this.$router.resolve({
                path: `/course/${id}`,
            });
            window.open(routeUrl.href, '_blank');
        },
        update(data){
            this.resultData = data;
        }
    },
    created(){
        this.resultData = this.$route.query.resultData;
        this.num = this.resultData.length
        console.log(this.resultData)
    }
}
</script>
<style scoped>
.courseList{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    margin: 100px;
    padding: 0;
}
.courseDetail{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    padding: 0;
    width: 900px;
    margin: 0 auto;
    text-align: center;
}
.numberTitle{
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    margin: 0 auto 40px;
    font-size: 14px;
    text-align: center;
    min-width: 140px;
    border-radius: 24px;
    display: inline-block;
    padding: 0 30px;
    background: #ebf2ff;
    color: #777;
}
.blueKeyword{
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 0;
    color: #3d84ff;
}
.searchList{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    margin: 0;
    padding: 0;
    text-align: left;
    margin-bottom: 60px;
}
.courseImg{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    width: 240px;
    height: 135px;
    position: relative;
    float: left;
    margin-right: 10px;
}
.imgSrc{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: middle;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.right{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    float: left;
    width: calc(100% - 250px);
    position: relative;
    margin-top: 10px;
    height: 116px;
}
.right-top{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
}
.name{
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    display: inline-block;
    line-height: 20px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 16px;
    color: #2a2a2a;
}
.teacherAndschool{
    line-height: 16px;
    color: #000;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    position: relative;
    margin-top: 2px;
    max-width: 450px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}
.teacher{
    line-height: 16px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #777;
}
.teacher {
    line-height: 16px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #777;
}
.teacher .name{
    line-height: 16px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #777;
}
.shuxian{
    line-height: 16px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #777;
}
.schoolName{
    line-height: 16px;
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #777;
}
.learnNum{
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    list-style: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    color: #777;
}
.light{
    font-family: -apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,Segoe UI,Roboto,Hiragino Sans GB,arial,Source Han Sans CN,sans-serif!important;
    -webkit-font-smoothing: antialiased;
    list-style: none;
    cursor: pointer;
    line-height: 18px;
    font-size: 12px;
    margin: 0;
    padding: 0;
    font-weight: 700;
    margin-left: 5px;
    color: #2a2a2a;
}
</style>
