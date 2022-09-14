import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/c_resources/'
export const getCourseWares=(params)=>{
    return getRequest(url,params);
}
export const getCourseWare=(params)=>{
    return getRequest(url,params);
}
export const addCourseWare=(params)=>{
    return postJsonRequest(url,params);
}
export const updateCourseWare=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteCourseWare=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getCourseWareDetail=(params)=>{
    return getRequest(url+params+'/');
}