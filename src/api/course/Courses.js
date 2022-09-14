import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url='api/course/courses/';
export const getCourses=(params)=>{
    return getRequest(url,params);
}
export const getCourse=(params)=>{
    return getRequest(url,params);
}
export const addCourse=(params)=>{
    return postJsonRequest(url,params);
}
export const updateCourse=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteCourse=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getCourseDetail=(params)=>{
    return getRequest(url+params+'/');
}
export const getBanner=(params)=>{
    return postRequest("api/course/getbanner/",params);
}
export const getProgress=(params)=>{
    return postRequest("api/course/learning/",params);
}