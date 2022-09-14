import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/u_courses/'
export const getUserCourses=(params)=>{
    return getRequest(url,params);
}
export const getUserCourse=(params)=>{
    return getRequest(url,params);
}
export const addUserCourse=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUserCourse=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUserCourse=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserCourseDetail=(params)=>{
    return getRequest(url+params+'/');
}