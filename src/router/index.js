import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Course from '@/components/course/Course'
import Schools from '@/components/operation/School'
import Exam from '@/components/exam/Exam'
import CourseDetail from '@/components/course/CourseDetail'
import Teacher from '@/components/teacher/Teacher'
import Notice from '@/components/notice/Notice'
import CourseWare from '@/components/course/CourseWare'
import Abstract from '@/components/course/Abstract'
import School from '@/components/course/School'
import Login from '@/components/common/Login'
import Play from '@/components/course/StudyPage'
import Myself from '@/components/user/Myself'
import Mycourse from '@/views/user/UserCourse'
import Schedule from '@/views/user/Schedule'
import MyExam from '@/views/exam/MyExam.vue'
import MyRecord from '@/views/exam/MyRecord'
import MyProfile from '@/views/user/Profile'
import SearchData from '@/views/common/SearchData'
import SchoolDetail from '@/components/operation/SchoolDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/courses',
      name: 'courses',
      component: Course
    },
    {
      path: '/schools',
      name: 'schools',
      component: Schools
    },
    {
      path: '/exam/:id',
      name: 'exam',
      component: Exam
    },
    {
      path:'/school/:id',
      name: 'schooldetail',
      component: SchoolDetail
    },
    {
      path:'/course/:id',
      name: 'coursedetail',
      component: CourseDetail,
      children:[
        {
          path: '/teacher/:id',
          name: 'teacher',
          component: Teacher
        },
        {
          path: '/notice/:id',
          name: 'notice',
          component: Notice
        },
        {
          path: '/courseware/:id',
          name: 'courseware',
          component: CourseWare
        },
        {
          path: '/abstract/:id',
          name: 'abstract',
          component: Abstract
        },
        {
          path: '/school/:id',
          name: 'school',
          component: School
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/player/:id',
      name: 'player',
      component: Play
    },
    {
      path: '/myself',
      name: 'myself',
      component: Myself,
      children:[
        {
          path: '/mycourse',
          name: 'mycourse',
          component: Mycourse
        },
        {
          path: '/schedule',
          name: 'schedule',
          component: Schedule
        },
        {
          path: '/myexam',
          name: 'myexam',
          component: MyExam
        },
        {
          path: '/myrecord',
          name: 'myrecord',
          component: MyRecord
        },
        {
          path: '/myprofile',
          name: 'myprofile',
          component: MyProfile
        }
      ]
    },
    {
      path: '/searchdata',
      name: 'searchdata',
      component: SearchData
    }

  ]
})
