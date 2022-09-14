import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/lessons/'
export const getLessons=(params)=>{
    return getRequest(url,params);
}
export const getLesson=(params)=>{
    return getRequest(url,params)
}
export const addLesson=(params)=>{
    return postJsonRequest(url,params);
}
export const updateLesson=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteLesson=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getLessonDetail=(params)=>{
    return getRequest(url,params);
}